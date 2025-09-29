import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  User, 
  BookOpen, 
  Edit, 
  Trash2, 
  GripVertical,
  ExternalLink,
  CalendarDays
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export interface Assistantship {
  id: string;
  courseName: string;
  courseCode: string;
  professor: string;
  department: string;
  program: string;
  type: "theoretical" | "practical" | "laboratory";
  hours: number;
  requirements: string[];
  description: string;
  applicationDeadline: string;
  status?: "pending" | "pre-selected" | "accepted" | "rejected";
}

interface AssistantshipCardProps {
  assistantship: Assistantship;
  variant?: "catalog" | "application";
  onApply?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  onResign?: (id: string) => void;
  onViewDetails?: (id: string) => void;
  isDraggable?: boolean;
  dragHandleProps?: any;
}

const AssistantshipCard = ({
  assistantship,
  variant = "catalog",
  onApply,
  onEdit,
  onDelete,
  onAccept,
  onReject,
  onResign,
  onViewDetails,
  isDraggable = false,
  dragHandleProps,
}: AssistantshipCardProps) => {
  const { toast } = useToast();
  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-gray-500 text-white text-sm font-medium px-2 py-1 rounded cursor-default pointer-events-none">Postulación realizada</Badge>;
      case "pre-selected":
        return <Badge className="bg-yellow-500 text-white text-sm font-medium px-2 py-1 rounded cursor-default pointer-events-none">Pre-Seleccionado</Badge>;
      case "accepted":
        return <Badge className="bg-green-500 text-white text-sm font-medium px-2 py-1 rounded cursor-default pointer-events-none">Aceptada</Badge>;
      case "rejected":
        return <Badge className="bg-red-500 text-white text-sm font-medium px-2 py-1 rounded cursor-default pointer-events-none">Rechazada</Badge>;
      default:
        return null;
    }
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

  return (
    <Card className={cn(
      "p-6 shadow-card card-hover transition-all duration-200",
      variant === "application" && "bg-gradient-subtle"
    )}>
      <div className="flex items-start justify-between gap-4">
        {/* Drag Handle */}
        {isDraggable && (
          <div {...dragHandleProps} className="drag-handle mt-1">
            <GripVertical className="h-4 w-4" />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-lg text-foreground mb-1">
                {assistantship.courseName}
              </h3>
              <p className="text-sm text-muted-foreground">
                {assistantship.courseCode} • {assistantship.department}
              </p>
            </div>
            {assistantship.status && getStatusBadge(assistantship.status)}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div className="flex items-center space-x-2 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">{assistantship.professor}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">{assistantship.hours}h semanales</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">{getTypeLabel(assistantship.type)}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">Hasta {assistantship.applicationDeadline}</span>
            </div>
          </div>

          {assistantship.description && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {assistantship.description}
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex space-x-2">
          {variant === "catalog" && onApply && (
            <Button onClick={() => onApply(assistantship.id)} size="sm">
              Postular
            </Button>
          )}
          
          {variant === "application" && (
            <>
              {onEdit && (
                <Button 
                  onClick={() => onEdit(assistantship.id)} 
                  variant="outline" 
                  size="sm"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Editar
                </Button>
              )}

              {/* Pending status: Only Delete button */}
              {assistantship.status === "pending" && onDelete && (
                <Button 
                  onClick={() => onDelete(assistantship.id)} 
                  variant="destructive" 
                  size="sm"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Eliminar
                </Button>
              )}

              {/* Pre-Selected status: Accept and Reject buttons */}
              {assistantship.status === "pre-selected" && (
                <>
                  {onAccept && (
                    <Button 
                      onClick={() => onAccept(assistantship.id)} 
                      size="sm"
                    >
                      Aceptar
                    </Button>
                  )}
                  {onReject && (
                    <Button 
                      onClick={() => onReject(assistantship.id)} 
                      variant="destructive" 
                      size="sm"
                    >
                      Rechazar
                    </Button>
                  )}
                </>
              )}

              {/* Accepted status: Resign button */}
              {assistantship.status === "accepted" && onResign && (
                <Button 
                  onClick={() => onResign(assistantship.id)} 
                  variant="destructive" 
                  size="sm"
                >
                  Renunciar
                </Button>
              )}

              {/* Rejected status: Only Delete button */}
              {assistantship.status === "rejected" && onDelete && (
                <Button 
                  onClick={() => onDelete(assistantship.id)} 
                  variant="destructive" 
                  size="sm"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Eliminar
                </Button>
              )}
            </>
          )}
        </div>

        {onViewDetails && (
          <Button 
            onClick={() => onViewDetails(assistantship.id)} 
            variant="ghost" 
            size="sm"
          >
            Ver más <ExternalLink className="h-3 w-3 ml-1" />
          </Button>
        )}
      </div>
    </Card>
  );
};

export default AssistantshipCard;