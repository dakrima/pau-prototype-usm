import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import AssistantshipCard, { Assistantship } from "@/components/AssistantshipCard";
import { AlertTriangle, CheckCircle, Clock, FileText, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { toast } = useToast();
  
  const [applications, setApplications] = useState<Assistantship[]>([
    {
      id: "app-1",
      courseName: "Programación Orientada a Objetos",
      courseCode: "IWI-131",
      professor: "Dr. María González",
      department: "Informática",
      program: "Ingeniería Civil Informática",
      type: "practical",
      hours: 6,
      requirements: ["Nota mínima 5.0", "Experiencia en Java"],
      description: "Ayudantía para apoyo en laboratorios de programación Java y corrección de tareas.",
      applicationDeadline: "15 Oct",
      status: "pending"
    },
    {
      id: "app-2",
      courseName: "Cálculo Diferencial e Integral",
      courseCode: "MAT-021",
      professor: "Dr. Carlos Herrera",
      department: "Matemática",
      program: "Ingeniería Civil",
      type: "theoretical",
      hours: 4,
      requirements: ["Nota mínima 6.0", "Haber cursado Cálculo II"],
      description: "Apoyo en clases auxiliares y resolución de ejercicios de cálculo.",
      applicationDeadline: "20 Oct",
      status: "accepted"
    },
    {
      id: "app-3",
      courseName: "Laboratorio de Química",
      courseCode: "QUI-010",
      professor: "Dra. Ana Morales",
      department: "Química",
      program: "Ingeniería Química",
      type: "laboratory",
      hours: 8,
      requirements: ["Nota mínima 5.5", "Experiencia en laboratorio"],
      description: "Supervisión y apoyo en experimentos de laboratorio de química general.",
      applicationDeadline: "12 Oct",
      status: "reviewed"
    }
  ]);

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

  const handleEdit = (id: string) => {
    toast({
      title: "Editar postulación",
      description: "Funcionalidad de edición en desarrollo.",
    });
  };

  const handleWithdraw = (id: string) => {
    setApplications(prev => prev.filter(app => app.id !== id));
    toast({
      title: "Postulación retirada",
      description: "Tu postulación ha sido retirada exitosamente.",
      variant: "destructive",
    });
  };

  const handleDelete = (id: string) => {
    setApplications(prev => prev.filter(app => app.id !== id));
    toast({
      title: "Postulación eliminada",
      description: "La postulación ha sido eliminada permanentemente.",
    });
  };

  const handleViewDetails = (id: string) => {
    // Navigate to detail page
    window.location.href = `/assistantship/${id}`;
  };

  const getStatusCounts = () => {
    const counts = {
      pending: applications.filter(app => app.status === "pending").length,
      accepted: applications.filter(app => app.status === "accepted").length,
      rejected: applications.filter(app => app.status === "rejected").length,
      reviewed: applications.filter(app => app.status === "reviewed").length,
    };
    return counts;
  };

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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Clock className="h-5 w-5 text-warning" />
          </div>
          <p className="text-2xl font-bold text-foreground">{statusCounts.pending}</p>
          <p className="text-sm text-muted-foreground">Pendientes</p>
        </Card>
        
        <Card className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <FileText className="h-5 w-5 text-info" />
          </div>
          <p className="text-2xl font-bold text-foreground">{statusCounts.reviewed}</p>
          <p className="text-sm text-muted-foreground">En Revisión</p>
        </Card>
        
        <Card className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <CheckCircle className="h-5 w-5 text-success" />
          </div>
          <p className="text-2xl font-bold text-foreground">{statusCounts.accepted}</p>
          <p className="text-sm text-muted-foreground">Aceptadas</p>
        </Card>
        
        <Card className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
          </div>
          <p className="text-2xl font-bold text-foreground">{statusCounts.rejected}</p>
          <p className="text-sm text-muted-foreground">Rechazadas</p>
        </Card>
      </div>

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
              Arrastra para reordenar por preferencia
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
                          <AssistantshipCard
                            assistantship={application}
                            variant="application"
                            isDraggable
                            dragHandleProps={provided.dragHandleProps}
                            onEdit={handleEdit}
                            onWithdraw={handleWithdraw}
                            onDelete={handleDelete}
                            onViewDetails={handleViewDetails}
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
    </div>
  );
};

export default Dashboard;