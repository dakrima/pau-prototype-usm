import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import AssistantshipCard from "@/components/AssistantshipCard";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CheckCircle,
  Clock,
  FileText,
  Plus,
  Trash2,
  X,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useApplicationsContext } from "@/context/ApplicationsContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";

const translateStatus = (status?: string) => {
  switch (status) {
    case "pending":
      return "Pendiente";
    case "pre-selected":
      return "Pre-seleccionada";
    case "accepted":
      return "Aceptada";
    case "rejected":
      return "Rechazada";
    case "renounced":
      return "Renunciada";
    default:
      return status;
  }
};


const Dashboard = () => {
  const { toast } = useToast();
  const { applications, setApplications } = useApplicationsContext();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showBulkDeleteDialog, setShowBulkDeleteDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [targetDeleteId, setTargetDeleteId] = useState<string | null>(null);
  const [showResignDialog, setShowResignDialog] = useState(false);
  const [targetResignId, setTargetResignId] = useState<string | null>(null);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(applications);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setApplications(items);
    toast({
      title: "Preferencia actualizada",
      description: "El orden de tus postulaciones ha sido modificado exitosamente.",
    });
  };

  const handleEdit = (id: string) =>
    toast({ title: "Editar postulación", description: "Funcionalidad en desarrollo." });

  //Confirmación antes de eliminar individualmente
  const requestDelete = (id: string) => {
    setTargetDeleteId(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (!targetDeleteId) return;
    setApplications((prev) => prev.filter((app) => app.id !== targetDeleteId));
    setSelectedIds((prev) => prev.filter((sid) => sid !== targetDeleteId));
    toast({
      title: "Postulación eliminada",
      description: "La postulación ha sido eliminada permanentemente.",
    });
    setShowDeleteDialog(false);
    setTargetDeleteId(null);
  };

  const handleSelect = (id: string, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((sid) => sid !== id)
    );
  };

  const handleBulkDelete = () => {
    setApplications((prev) => prev.filter((app) => !selectedIds.includes(app.id)));
    setSelectedIds([]);
    setShowBulkDeleteDialog(false);
    toast({
      title: "Postulaciones eliminadas",
      description: `Se eliminaron ${selectedIds.length} postulación(es) exitosamente.`,
    });
  };

  const bulkActionStatus = selectedIds.length > 0;
  const isBulkSelecting = selectedIds.length > 0;

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...applications];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setApplications(updated);
    toast({ title: "Orden actualizado", description: "Subiste una prioridad." });
  };

  const handleMoveDown = (index: number) => {
    if (index === applications.length - 1) return;
    const updated = [...applications];
    [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
    setApplications(updated);
    toast({ title: "Orden actualizado", description: "Bajaste una prioridad." });
  };

  const handleViewDetails = (id: string) =>
    (window.location.href = `/assistantship/${id}`);

  const getStatusCounts = () => ({
    pending: applications.filter((a) => a.status === "pending").length,
    "pre-selected": applications.filter((a) => a.status === "pre-selected").length,
    accepted: applications.filter((a) => a.status === "accepted").length,
  });

  const statusCounts = getStatusCounts();
  
  const requestResign = (id: string) => {
    setTargetResignId(id);
    setShowResignDialog(true);
  };

  const confirmResign = () => {
    if (!targetResignId) return;

    setApplications((prev) =>
      prev.map((app) =>
        app.id === targetResignId ? { ...app, status: "renounced" } : app
      )
    );

    toast({
      title: "Has renunciado a la ayudantía",
      description: "Tu estado ahora es 'Renunciada'.",
    });

    setShowResignDialog(false);
    setTargetResignId(null);
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "theoretical":
        return "Contacto";
      case "Grader":
        return "Corrector";
      case "laboratory":
        return "Laboratorio";
      case "Research":
        return "Investigación";
      case "Administrative":
        return "Administrativa";
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mis Postulaciones</h1>
          <p className="text-muted-foreground">
            Gestiona tus postulaciones y reordena por preferencia
          </p>
        </div>
        <Link to="/explore">
          <Button className="bg-gradient-primary hover:bg-primary-hover">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Postulación
          </Button>
        </Link>
      </div>

      

      {/* Bulk Actions Bar */}
      {bulkActionStatus && (
        <Card className="p-4 bg-accent/60 border-accent sticky top-[72px] z-40 shadow-md rounded-md backdrop-blur">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-foreground">
                {selectedIds.length} seleccionada(s)
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedIds([])}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowBulkDeleteDialog(true)}
              className="font-semibold text-base px-4 py-2"
            >
              <Trash2 className="h-5 w-5 mr-2" />
              Eliminar seleccionadas
            </Button>
          </div>
        </Card>
      )}

      {/* Applications List */}
      {applications.length === 0 ? (
        <Card className="p-8 text-center">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            No tienes postulaciones activas
          </h3>
          <p className="text-muted-foreground mb-4">
            Comienza explorando las ayudantías disponibles y postula a las que más te interesen.
          </p>
          <Link to="/explore">
            <Button>Explorar Ayudantías</Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              Orden de Preferencia
            </h2>
            <p className="text-sm text-muted-foreground">
              Arrastra o usa las flechas para reordenar
            </p>
          </div>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="applications">
              {(provided) => (
                <table
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="w-full text-left border-collapse"
                >
                  <thead>
                    <tr className="border-b bg-muted/30">
                      
                      {/* Checkbox global */}
                      <th className="p-3 w-10">
                      <Checkbox
                        checked={
                          selectedIds.length === applications.length
                            ? true
                            : selectedIds.length === 0
                            ? false
                            : "indeterminate"
                        }
                        onCheckedChange={(checked) =>
                          checked
                            ? setSelectedIds(applications.map((a) => a.id))
                            : setSelectedIds([])
                        }
                      />

                      </th>

                      <th className="p-3 font-semibold">#</th>
                      <th className="p-3 font-semibold">Curso</th>
                      <th className="p-3 font-semibold">Profesor</th>
                      <th className="p-3 font-semibold">Horas</th>
                      <th className="p-3 font-semibold">Tipo</th>
                      <th className="p-3 font-semibold">Estado</th>
                      <th className="p-3 font-semibold text-right">Acciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    {applications.map((app, index) => (
                      <Draggable key={app.id} draggableId={app.id} index={index}>
                        {(provided, snapshot) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={cn(
                              "border-b transition-colors",
                              snapshot.isDragging && "bg-accent/40 shadow-md"
                            )}
                          >
                            {/* Checkbox por fila */}
                            <td className="p-3 w-10">
                              <Checkbox
                                checked={selectedIds.includes(app.id)}
                                onCheckedChange={(checked) =>
                                  handleSelect(app.id, checked as boolean)
                                }
                              />
                            </td>

                            {/* Drag handle + prioridad */}
                            <td className="p-3 font-bold w-24">
                              <div className="flex items-center gap-2">

                                <div
                                  {...provided.dragHandleProps}
                                  className="cursor-grab active:cursor-grabbing opacity-70 hover:opacity-100"
                                >
                                  ⋮⋮
                                </div>

                                #{index + 1}
                              </div>
                            </td>

                            <td className="p-3">{app.courseName}</td>
                            <td className="p-3">{app.professor}</td>
                            <td className="p-3">{app.hours} hrs.</td>
                            <td className="p-3 capitalize">{getTypeLabel(app.type)}</td>

                            <td className="p-3">
                              <span
                                className={cn(
                                  "px-2 py-1 rounded text-xs font-medium",
                                  app.status === "pending" && "bg-gray-200 text-gray-700",
                                  app.status === "pre-selected" && "bg-yellow-200 text-yellow-700",
                                  app.status === "accepted" && "bg-green-200 text-green-700",
                                  app.status === "rejected" && "bg-red-200 text-red-700",
                                  app.status === "renounced" && "bg-purple-200 text-purple-700"
                                )}
                              >
                                {translateStatus(app.status)}

                              </span>
                            </td>

                            <td className="p-3 text-right">

                              <div className="flex justify-end gap-1">

                                {/* Flecha arriba */}
                                <Button
                                  variant="outline"
                                  size="icon"
                                  disabled={index === 0}
                                  onClick={() => handleMoveUp(index)}
                                  className="h-8 w-8"
                                >
                                  <ChevronUp className="h-4 w-4" />
                                </Button>

                                {/* Flecha abajo */}
                                <Button
                                  variant="outline"
                                  size="icon"
                                  disabled={index === applications.length - 1}
                                  onClick={() => handleMoveDown(index)}
                                  className="h-8 w-8"
                                >
                                  <ChevronDown className="h-4 w-4" />
                                </Button>

                                {/* Dropdown Menu */}
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      ⋮
                                    </Button>
                                  </DropdownMenuTrigger>

                                  <DropdownMenuContent align="end" className="w-44">

                                    <DropdownMenuItem onClick={() => handleViewDetails(app.id)}>
                                      Ver detalles
                                    </DropdownMenuItem>

                                    <DropdownMenuItem onClick={() => handleEdit(app.id)}>
                                      Editar
                                    </DropdownMenuItem>

                                    {app.status === "accepted" && (
                                      <DropdownMenuItem
                                        onClick={() => requestResign(app.id)}
                                        className="text-red-600"
                                      >
                                        Renunciar
                                      </DropdownMenuItem>
                                    )}

                                    {app.status !== "accepted" && (
                                      <DropdownMenuItem
                                        onClick={() => requestDelete(app.id)}
                                        className="text-red-600"
                                      >
                                        Eliminar
                                      </DropdownMenuItem>
                                    )}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </tbody>
                </table>
              )}
            </Droppable>
          </DragDropContext>

        </div>
      )}

      {/* Confirmación eliminación individual */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar eliminación</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Seguro que deseas eliminar esta postulación?
              <span className="block mt-2 text-destructive">
                Esta acción no se puede deshacer.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Confirmación eliminación masiva */}
      <AlertDialog open={showBulkDeleteDialog} onOpenChange={setShowBulkDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar eliminación</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que deseas eliminar {selectedIds.length} postulación(es)?
              <span className="block mt-2 text-destructive">
                Esta acción no se puede deshacer.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBulkDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Confirmación renuncia */}
      <AlertDialog open={showResignDialog} onOpenChange={setShowResignDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar renuncia</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Seguro que deseas renunciar a esta ayudantía aceptada?
              <span className="block mt-2 text-muted-foreground">
                Volverá a aparecer como "Renunciada" en tu lista.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmResign}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Renunciar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Dashboard;
