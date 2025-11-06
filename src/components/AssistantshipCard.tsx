import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Clock, User, BookOpen, GripVertical, ExternalLink, MoreVertical, Edit, Trash2, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

export interface Assistantship {
  id: string;
  courseName: string;
  courseCode: string;
  professor: string;
  department: string;
  program: string;
  campus: string;
  type: "theoretical" | "laboratory" | "Research" | "administrative" | "Grader";
  hours: number;
  requirements: string[];
  description: string;
  applicationDeadline: string;
  status?: "pending" | "pre-selected" | "accepted" | "rejected" | "renounced";
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
  isSelected?: boolean;
  onSelect?: (id: string, checked: boolean) => void;
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
  isSelected = false,
  onSelect,
}: AssistantshipCardProps) => {
  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-gray-500 text-white">Postulación realizada</Badge>;
      case "pre-selected":
        return <Badge className="bg-yellow-500 text-white">Pre-Seleccionado</Badge>;
      case "accepted":
        return <Badge className="bg-green-500 text-white">Aceptada</Badge>;
      case "rejected":
        return <Badge className="bg-red-500 text-white">Rechazada</Badge>;
      case "renounced":
        return <Badge className="bg-orange-500 text-white">Renunciada</Badge>;
      default:
        return null;
    }
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
    <Card
      className={cn(
        "p-6 shadow-card card-hover transition-all duration-200",
        variant === "application" && "bg-gradient-subtle",
        isSelected && "ring-2 ring-primary"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Checkbox de selección */}
        {variant === "application" && onSelect && (
          <div className="mt-1">
            <Checkbox
              checked={isSelected}
              onCheckedChange={(checked) => onSelect(assistantship.id, checked as boolean)}
            />
          </div>
        )}

        {/* Manejador de arrastre */}
        {isDraggable && (
          <div {...dragHandleProps} className="drag-handle mt-1">
            <GripVertical className="h-4 w-4" />
          </div>
        )}

        {/* Contenido principal */}
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
              <span className="text-foreground">{assistantship.hours}h mensuales</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">{getTypeLabel(assistantship.type)}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">Campus {assistantship.campus}</span>
            </div>
          </div>

          {assistantship.description && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {assistantship.description}
            </p>
          )}
        </div>
      </div>

      {/* Acciones */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex space-x-2">
          {variant === "catalog" && (
            <Button
              onClick={onApply ? () => onApply(assistantship.id) : undefined}
              size="sm"
              disabled={!onApply}
              variant={!onApply ? "secondary" : "default"}
            >
              {onApply ? "Postular" : "Ya Postulaste"}
            </Button>
          )}

          {variant === "application" && (
            <>
              {/* Menú ⋮ */}
              {(onEdit || onDelete || onResign) && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="start">
                    {/* Editar siempre visible */}
                    {onEdit && (
                      <DropdownMenuItem onClick={() => onEdit(assistantship.id)}>
                        <Edit className="h-4 w-4 mr-2" /> Editar
                      </DropdownMenuItem>
                    )}

                    {/* Si está aceptada, solo mostrar Renunciar */}
                    {assistantship.status === "accepted" && onResign && (
                      <DropdownMenuItem
                        onClick={() => onResign(assistantship.id)}
                        className="text-destructive"
                      >
                        <LogOut className="h-4 w-4 mr-2" /> Renunciar
                      </DropdownMenuItem>
                    )}

                    {/* Permitir eliminar excepto cuando está aceptada */}
                    {assistantship.status !== "accepted" && onDelete && (
                      <DropdownMenuItem onClick={() => onDelete(assistantship.id)}>
                        <Trash2 className="h-4 w-4 mr-2" /> Eliminar
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {/* Pre-Seleccionado: Aceptar / Rechazar */}
              {assistantship.status === "pre-selected" && (
                <>
                  {onAccept && (
                    <Button onClick={() => onAccept(assistantship.id)} size="sm">
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
