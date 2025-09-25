import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import AssistantshipCard, { Assistantship } from "@/components/AssistantshipCard";
import { Search, Filter, Calendar, BookOpen, Users } from "lucide-react";

const Explore = () => {
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedProgram, setSelectedProgram] = useState("all");

  const availableAssistantships: Assistantship[] = [
    {
      id: "asst-1",
      courseName: "Estructuras de Datos y Algoritmos",
      courseCode: "IWI-131",
      professor: "Dr. Pedro Rodríguez",
      department: "Informática",
      program: "Ingeniería Civil Informática",
      type: "theoretical",
      hours: 4,
      requirements: ["Nota mínima 5.5", "Conocimientos en C++"],
      description: "Apoyo en clases auxiliares de estructuras de datos, algoritmos de ordenamiento y búsqueda. Revisión de tareas y apoyo a estudiantes.",
      applicationDeadline: "25 Oct"
    },
    {
      id: "asst-2",
      courseName: "Física General I",
      courseCode: "FIS-110",
      professor: "Dra. Carmen López",
      department: "Física",
      program: "Ingeniería Civil",
      type: "laboratory",
      hours: 6,
      requirements: ["Nota mínima 6.0", "Experiencia en laboratorio"],
      description: "Supervisión de experimentos de mecánica clásica, apoyo en montaje de equipos y corrección de informes de laboratorio.",
      applicationDeadline: "30 Oct"
    },
    {
      id: "asst-3",
      courseName: "Álgebra Lineal",
      courseCode: "MAT-022",
      professor: "Dr. Luis Martínez",
      department: "Matemática",
      program: "Ingeniería Civil",
      type: "theoretical",
      hours: 4,
      requirements: ["Nota mínima 6.5", "Dominio de matrices"],
      description: "Resolución de ejercicios en clases auxiliares, apoyo en conceptos de espacios vectoriales y transformaciones lineales.",
      applicationDeadline: "28 Oct"
    },
    {
      id: "asst-4",
      courseName: "Termodinámica",
      courseCode: "MEE-230",
      professor: "Dr. Roberto Sánchez",
      department: "Mecánica",
      program: "Ingeniería Civil Mecánica",
      type: "practical",
      hours: 5,
      requirements: ["Nota mínima 5.8", "Conocimientos de física"],
      description: "Apoyo en resolución de problemas de ciclos termodinámicos, propiedades de sustancias y transferencia de calor.",
      applicationDeadline: "22 Oct"
    },
    {
      id: "asst-5",
      courseName: "Química Orgánica",
      courseCode: "QUI-120",
      professor: "Dra. Isabel Vargas",
      department: "Química",
      program: "Ingeniería Química",
      type: "laboratory",
      hours: 8,
      requirements: ["Nota mínima 6.0", "Seguridad en laboratorio"],
      description: "Supervisión de síntesis orgánicas, apoyo en técnicas de purificación y análisis espectroscópico de compuestos.",
      applicationDeadline: "18 Oct"
    },
    {
      id: "asst-6",
      courseName: "Bases de Datos",
      courseCode: "IWI-253",
      professor: "Dr. Mario Fernández",
      department: "Informática",
      program: "Ingeniería Civil Informática",
      type: "practical",
      hours: 6,
      requirements: ["Nota mínima 5.5", "SQL avanzado"],
      description: "Apoyo en diseño de bases de datos relacionales, optimización de consultas y desarrollo de proyectos con SGBD.",
      applicationDeadline: "26 Oct"
    }
  ];

  const departments = ["Informática", "Matemática", "Física", "Química", "Mecánica"];
  const programs = [
    "Ingeniería Civil Informática",
    "Ingeniería Civil",
    "Ingeniería Civil Mecánica",
    "Ingeniería Química"
  ];

  const filteredAssistantships = useMemo(() => {
    return availableAssistantships.filter((assistantship) => {
      const matchesSearch = 
        assistantship.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assistantship.professor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assistantship.courseCode.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = 
        selectedDepartment === "all" || assistantship.department === selectedDepartment;
      
      const matchesType = 
        selectedType === "all" || assistantship.type === selectedType;
      
      const matchesProgram = 
        selectedProgram === "all" || assistantship.program === selectedProgram;

      return matchesSearch && matchesDepartment && matchesType && matchesProgram;
    });
  }, [searchTerm, selectedDepartment, selectedType, selectedProgram]);

  const handleApply = (id: string) => {
    // Navigate to application form or open modal
    window.location.href = `/assistantship/${id}`;
  };

  const handleViewDetails = (id: string) => {
    window.location.href = `/assistantship/${id}`;
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedDepartment("all");
    setSelectedType("all");
    setSelectedProgram("all");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Explorar Ayudantías</h1>
          <p className="text-muted-foreground">
            Descubre ayudantías disponibles para el semestre actual
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-accent-foreground border-accent">
            <Calendar className="h-3 w-3 mr-1" />
            {availableAssistantships.length} disponibles
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          <div className="lg:col-span-2">
            <label className="text-sm font-medium text-foreground mb-2 block">
              Buscar
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Curso, profesor o código..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Departamento
            </label>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Tipo
            </label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="theoretical">Teórica</SelectItem>
                <SelectItem value="practical">Práctica</SelectItem>
                <SelectItem value="laboratory">Laboratorio</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end space-x-2">
            <Button
              onClick={clearFilters}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              <Filter className="h-4 w-4 mr-2" />
              Limpiar
            </Button>
          </div>
        </div>
      </Card>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredAssistantships.length === availableAssistantships.length 
            ? `Mostrando todas las ${availableAssistantships.length} ayudantías`
            : `Mostrando ${filteredAssistantships.length} de ${availableAssistantships.length} ayudantías`
          }
        </p>
      </div>

      {/* Assistantships Grid */}
      {filteredAssistantships.length === 0 ? (
        <Card className="p-8 text-center">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            No se encontraron ayudantías
          </h3>
          <p className="text-muted-foreground mb-4">
            Intenta ajustar los filtros o buscar términos diferentes.
          </p>
          <Button onClick={clearFilters} variant="outline">
            Limpiar filtros
          </Button>
        </Card>
      ) : (
        <div className="grid gap-6">
          {filteredAssistantships.map((assistantship) => (
            <AssistantshipCard
              key={assistantship.id}
              assistantship={assistantship}
              variant="catalog"
              onApply={handleApply}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}

      {/* Load More (placeholder for pagination) */}
      {filteredAssistantships.length > 0 && (
        <div className="text-center pt-6">
          <Button variant="outline">
            <Users className="h-4 w-4 mr-2" />
            Cargar más ayudantías
          </Button>
        </div>
      )}
    </div>
  );
};

export default Explore;