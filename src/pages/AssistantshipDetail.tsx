import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Clock, 
  User, 
  BookOpen, 
  CalendarDays, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Users,
  Award,
  MapPin
} from "lucide-react";
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
import { Assistantship } from "@/components/AssistantshipCard";

const AssistantshipDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showApplicationDialog, setShowApplicationDialog] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  // Mock data - in a real app, this would be fetched based on the ID
  const assistantship: Assistantship = {
    id: id || "1",
    courseName: "Programación Orientada a Objetos",
    courseCode: "IWI-131",
    professor: "Dr. María González",
    department: "Informática",
    program: "Ingeniería Civil Informática",
    campus: "San Joaquín",
    type: "laboratory",
    hours: 6,
    requirements: [
      "Nota mínima 5.0 en el ramo",
      "Experiencia previa en Java",
      "Disponibilidad de 6 horas semanales",
      "Habilidades de comunicación"
    ],
    description: "Esta ayudantía se enfoca en el apoyo a estudiantes de segundo año en el aprendizaje de programación orientada a objetos utilizando Java. Las responsabilidades incluyen la preparación y dictado de clases auxiliares, corrección de tareas y proyectos, y atención personalizada a estudiantes con dificultades.",
    applicationDeadline: "15 de Octubre, 2024"
  };

  const additionalInfo = {
    location: "Laboratorio de Informática, Edificio F",
    schedule: "Martes y Jueves 14:30-17:30",
    studentsCount: "~45 estudiantes",
    prerequisites: "IWI-130 (Introducción a la Programación)",
    evaluation: "Examen de conocimientos + Entrevista personal",
    startDate: "1 de Noviembre, 2024",
    endDate: "31 de Marzo, 2025"
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "theoretical":
        return "Teórica";
      case "practical":
        return "Práctica";
      case "laboratory":
        return "Laboratorio";
      default:
        return type;
    }
  };

  const handleApply = async () => {
    setIsApplying(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsApplying(false);
      setShowApplicationDialog(false);
      toast({
        title: "¡Postulación enviada exitosamente!",
        description: "Tu postulación ha sido registrada. Recibirás una confirmación por correo.",
      });
      navigate("/");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button 
          onClick={() => navigate(-1)} 
          variant="ghost" 
          size="sm"
          className="hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
        
        <Badge variant="outline" className="text-accent-foreground border-accent">
          <CalendarDays className="h-3 w-3 mr-1" />
          Hasta {assistantship.applicationDeadline}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Course Info */}
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  {assistantship.courseName}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <FileText className="h-4 w-4" />
                    <span>{assistantship.courseCode}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{assistantship.department}</span>
                  </span>
                  <Badge variant="secondary">
                    {getTypeLabel(assistantship.type)}
                  </Badge>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">{assistantship.professor}</p>
                    <p className="text-sm text-muted-foreground">Profesor a cargo</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">{assistantship.hours} horas semanales</p>
                    <p className="text-sm text-muted-foreground">Carga horaria</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">{additionalInfo.studentsCount}</p>
                    <p className="text-sm text-muted-foreground">Estudiantes aproximados</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">{additionalInfo.location}</p>
                    <p className="text-sm text-muted-foreground">Ubicación</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Description */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">
              Descripción de la Ayudantía
            </h2>
            <p className="text-foreground leading-relaxed">
              {assistantship.description}
            </p>
          </Card>

          {/* Requirements */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Requisitos y Competencias
            </h2>
            <div className="space-y-3">
              {assistantship.requirements.map((requirement, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{requirement}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Additional Details */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Detalles Adicionales
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="font-medium text-foreground">Horario</p>
                <p className="text-muted-foreground">{additionalInfo.schedule}</p>
              </div>
              
              <div className="space-y-2">
                <p className="font-medium text-foreground">Prerrequisitos</p>
                <p className="text-muted-foreground">{additionalInfo.prerequisites}</p>
              </div>
              
              <div className="space-y-2">
                <p className="font-medium text-foreground">Proceso de Evaluación</p>
                <p className="text-muted-foreground">{additionalInfo.evaluation}</p>
              </div>
              
              <div className="space-y-2">
                <p className="font-medium text-foreground">Período</p>
                <p className="text-muted-foreground">
                  {additionalInfo.startDate} - {additionalInfo.endDate}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Application Card */}
          <Card className="p-6 border-primary/20 bg-gradient-subtle">
            <div className="text-center space-y-4">
              <div className="bg-primary/10 rounded-full p-3 w-fit mx-auto">
                <Award className="h-6 w-6 text-primary" />
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  ¡Postula Ahora!
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Esta oportunidad cierra el {assistantship.applicationDeadline}
                </p>
              </div>
              
              <Button 
                onClick={() => setShowApplicationDialog(true)}
                className="w-full bg-gradient-primary hover:bg-primary-hover"
                size="lg"
              >
                Postular a esta Ayudantía
              </Button>
              
              <p className="text-xs text-muted-foreground">
                Tu postulación será revisada por el equipo docente
              </p>
            </div>
          </Card>

          {/* Important Notice */}
          <Card className="p-4 border-warning/20 bg-warning/5">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Información Importante</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• Las postulaciones se evalúan por orden de llegada</p>
                  <p>• Se requiere entrevista personal</p>
                  <p>• Compromiso mínimo de un semestre</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Contact Info */}
          <Card className="p-4">
            <h4 className="font-medium text-foreground mb-3">Contacto</h4>
            <div className="space-y-2 text-sm">
              <div>
                <p className="font-medium text-foreground">{assistantship.professor}</p>
                <p className="text-muted-foreground">maria.gonzalez@usm.cl</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Coordinación Académica</p>
                <p className="text-muted-foreground">ayudantias.inf@usm.cl</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Application Confirmation Dialog */}
      <AlertDialog open={showApplicationDialog} onOpenChange={setShowApplicationDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Postulación</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro que deseas postular a la ayudantía de <strong>{assistantship.courseName}</strong>?
              <br /><br />
              Esta acción registrará tu interés y el profesor recibirá tu información de contacto.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isApplying}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleApply}
              disabled={isApplying}
              className="bg-gradient-primary hover:bg-primary-hover"
            >
              {isApplying ? "Postulando..." : "Confirmar Postulación"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AssistantshipDetail;