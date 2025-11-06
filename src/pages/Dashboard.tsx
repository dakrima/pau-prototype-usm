import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import AssistantshipCard from "@/components/AssistantshipCard";
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

const Dashboard = () => {
  const { toast } = useToast();
  const { applications, setApplications } = useApplicationsContext();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showBulkDeleteDialog, setShowBulkDeleteDialog] = useState(false);

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

  const handleDelete = (id: string) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
    setSelectedIds((prev) => prev.filter((sid) => sid !== id));
    toast({
      title: "Postulación eliminada",
      description: "La postulación ha sido eliminada permanentemente.",
    });
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

      {/* Status Overview */}
      <div className="flex flex-wrap justify-center gap-6">
        <Card className="w-56 p-6 text-center">
          <div className="flex items-center justify-center mb-2">
            <Clock className="h-6 w-6 text-slate-600" />
          </div>
          <p className="text-3xl font-bold text-foreground">{statusCounts.pending}</p>
          <p className="text-base text-muted-foreground">Pendientes</p>
        </Card>

        <Card className="w-56 p-6 text-center">
          <div className="flex items-center justify-center mb-2">
            <FileText className="h-6 w-6 text-warning" />
          </div>
          <p className="text-3xl font-bold text-foreground">
            {statusCounts["pre-selected"]}
          </p>
          <p className="text-base text-muted-foreground">Pre-Seleccionadas</p>
        </Card>

        <Card className="w-56 p-6 text-center">
          <div className="flex items-center justify-center mb-2">
            <CheckCircle className="h-6 w-6 text-success" />
          </div>
          <p className="text-3xl font-bold text-foreground">{statusCounts.accepted}</p>
          <p className="text-base text-muted-foreground">Aceptadas</p>
        </Card>
      </div>

      {/* Bulk Actions Bar */}
      {bulkActionStatus && (
        <Card className="p-4 bg-accent/80 border-accent sticky top-[100px] z-40 shadow-md rounded-md backdrop-blur">
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
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-3"
                >
                  {applications.map((application, index) => (
                    <Draggable
                      key={application.id}
                      draggableId={application.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`${
                            snapshot.isDragging ? "shadow-hover rotate-1" : ""
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-base font-semibold text-primary">
                                Prioridad #{index + 1}
                              </span>
                              <div className="flex gap-1">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  disabled={index === 0}
                                  onClick={() => handleMoveUp(index)}
                                  className="h-9 w-9 rounded-full border-primary/30 hover:bg-primary/10 transition-colors"
                                >
                                  <ChevronUp className="h-5 w-5 text-primary" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  disabled={index === applications.length - 1}
                                  onClick={() => handleMoveDown(index)}
                                  className="h-9 w-9 rounded-full border-primary/30 hover:bg-primary/10 transition-colors"
                                >
                                  <ChevronDown className="h-5 w-5 text-primary" />
                                </Button>
                              </div>
                            </div>
                          </div>

                          <AssistantshipCard
                            assistantship={application}
                            variant="application"
                            isDraggable
                            dragHandleProps={provided.dragHandleProps}
                            onEdit={isBulkSelecting ? undefined : handleEdit}
                            onDelete={isBulkSelecting ? undefined : handleDelete}
                            onViewDetails={isBulkSelecting ? undefined : handleViewDetails}
                            isSelected={selectedIds.includes(application.id)}
                            onSelect={handleSelect}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )}

      {/* Bulk Delete Confirmation Dialog */}
      <AlertDialog
        open={showBulkDeleteDialog}
        onOpenChange={setShowBulkDeleteDialog}
      >
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
    </div>
  );
};

export default Dashboard;
