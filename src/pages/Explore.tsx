import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useApplications } from "@/hooks/use-applications";
import { useApplicationsContext } from "@/context/ApplicationsContext";
import AssistantshipCard, { Assistantship } from "@/components/AssistantshipCard";
import { Search, Filter, Calendar, BookOpen, Users } from "lucide-react";

const Explore = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addApplication, isApplied } = useApplicationsContext();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedProgram, setSelectedProgram] = useState("all");
  const [selectedCampus, setSelectedCampus] = useState("all");

  const availableAssistantships: Assistantship[] = [
    {
      id: "asst-1",
      courseName: "Estructuras de Datos y Algoritmos",
      courseCode: "INF134",
      professor: "Ricardo Antonio Salas Letelier",
      department: "Informática",
      program: "Ingeniería Civil Informática",
      campus: "San Joaquín",
      type: "theoretical",
      hours: 15,
      requirements: ["Nota mínima 5.5", "Conocimientos en C++"],
      description: "Ayudante encargado de revisión de tareas y apoyo a estudiantes.",
      applicationDeadline: "25 Oct"
    },
    {
      id: "asst-2",
      courseName: "Física General II",
      courseCode: "FIS120",
      professor: "Hector Andres Duarte Portilla",
      department: "Física",
      program: "Ingeniería Civil",
      campus: "San Joaquín",
      type: "laboratory",
      hours: 15,
      requirements: ["Nota mínima 6.0", "Experiencia en laboratorio"],
      description: "Supervisión de experimentos en laboratorio. Apoyo en montaje de equipos y corrección de informes de laboratorio.",
      applicationDeadline: "30 Oct"
    },
    {
      id: "asst-3",
      courseName: "Matematica I",
      courseCode: "MAT021",
      professor: "Pablo Felix Gonzalez Lever",
      department: "Matemática",
      program: "Ingeniería Civil",
      campus: "San Joaquín",
      type: "theoretical",
      hours: 15,
      requirements: ["Nota mínima 6.5", "Dominio de matrices"],
      description: "Resolución de ejercicios en ayudantías, apoyo en conceptos de la materia.",
      applicationDeadline: "28 Oct"
    },
    {
      id: "asst-4",
      courseName: "Mecanica General",
      courseCode: "IWM151",
      professor: "Francisco Javier Cofre Sanzo",
      department: "Mecánica",
      program: "Ingeniería Civil Mecánica",
      campus: "San Joaquín",
      type: "Grader",
      hours: 15,
      requirements: ["Nota mínima 5.8", "Conocimientos de física"],
      description: "Tener motivación y ganas para transmitir conocimiento en mecanica general.",
      applicationDeadline: "22 Oct"
    },
    {
      id: "asst-5",
      courseName: "Estadística Computacional",
      courseCode: "INF280",
      professor: "Juan Ricardo Ñanculef Alegria",
      department: "Informática",
      program: "Ingeniería Civil Informática",
      campus: "San Joaquín",
      type: "Research",
      hours: 15,
      requirements: ["Nota mínima 6.0", "Seguridad en laboratorio"],
      description: "Tener motivación y ganas. Conocimiento en estadística.",
      applicationDeadline: "18 Oct"
    },
    {
      id: "asst-6",
      courseName: "Diseño de Interfaces Usuarias",
      courseCode: "INF322",
      professor: "Lioubov Dombrovskaia",
      department: "Informática",
      program: "Ingeniería Civil Informática",
      campus: "San Joaquín",
      type: "theoretical",
      hours: 15,
      requirements: ["Nota mínima 5.5", "Interes en interfaces usuarias"],
      description: "Apoyo en certamenes y actividades de clase. Revisión de tareas.",
      applicationDeadline: "26 Oct"
    },
    {
      id: "asst-7",
      courseName: "Estructuras Discretas",
      courseCode: "INF152",
      professor: "Julio Andrés Sotelo Parraguez",
      department: "Informática",
      program: "Ingeniería Civil Informática",
      campus: "San Joaquín",
      type: "theoretical",
      hours: 15,
      requirements: ["Nota mínima 5.5", "Interes en enseñar"],
      description: "Apoyo en certamenes y actividades de clase. Revisión de tareas.",
      applicationDeadline: "26 Oct"
    },
    {
      id: "asst-8",
      courseName: "Informática Legal y Derecho Informático",
      courseCode: "INF300",
      professor: "Pedro Felipe Toledo Correa",
      department: "Informática",
      program: "Ingeniería Civil Informática",
      campus: "San Joaquín",
      type: "theoretical",
      hours: 15,
      requirements: ["Nota mínima 5.5", "Interes en enseñar"],
      description: "Apoyo en certamenes y actividades de clase. Revisión de tareas.",
      applicationDeadline: "26 Oct"
    },
    {
      id: "asst-9",
      courseName: "Estructuras de Datos y Algoritmos",
      courseCode: "INF134",
      professor: "Ricardo Antonio Salas Letelier",
      department: "Informática",
      program: "Ingeniería Civil Informática",
      campus: "Vitacura",
      type: "theoretical",
      hours: 15,
      requirements: ["Nota mínima 5.5", "Conocimientos en C++"],
      description: "Ayudante encargado de revisión de tareas y apoyo a estudiantes.",
      applicationDeadline: "25 Oct"
    },
    {
      id: "asst-10",
      courseName: "Física General II",
      courseCode: "FIS120",
      professor: "Hector Andres Duarte Portilla",
      department: "Física",
      program: "Ingeniería Civil",
      campus: "Vitacura",
      type: "laboratory",
      hours: 15,
      requirements: ["Nota mínima 6.0", "Experiencia en laboratorio"],
      description: "Supervisión de experimentos en laboratorio. Apoyo en montaje de equipos y corrección de informes de laboratorio.",
      applicationDeadline: "30 Oct"
    },
    {
      id: "asst-11",
      courseName: "Matematica I",
      courseCode: "MAT021",
      professor: "Pablo Felix Gonzalez Lever",
      department: "Matemática",
      program: "Ingeniería Civil",
      campus: "Vitacura",
      type: "theoretical",
      hours: 15,
      requirements: ["Nota mínima 6.5", "Dominio de matrices"],
      description: "Resolución de ejercicios en ayudantías, apoyo en conceptos de la materia.",
      applicationDeadline: "28 Oct"
    },
    {
      id: "asst-12",
      courseName: "Mecanica General",
      courseCode: "IWM151",
      professor: "Francisco Javier Cofre Sanzo",
      department: "Mecánica",
      program: "Ingeniería Civil Mecánica",
      campus: "Vitacura",
      type: "Grader",
      hours: 15,
      requirements: ["Nota mínima 5.8", "Conocimientos de física"],
      description: "Tener motivación y ganas para transmitir conocimiento en mecanica general.",
      applicationDeadline: "22 Oct"
    },
    {
      id: "asst-13",
      courseName: "Estadística Computacional",
      courseCode: "INF280",
      professor: "Juan Ricardo Ñanculef Alegria",
      department: "Informática",
      program: "Ingeniería Civil Informática",
      campus: "Vitacura",
      type: "Research",
      hours: 15,
      requirements: ["Nota mínima 6.0", "Seguridad en laboratorio"],
      description: "Tener motivación y ganas. Conocimiento en estadística.",
      applicationDeadline: "18 Oct"
    },
    {
      id: "asst-14",
      courseName: "Diseño de Interfaces Usuarias",
      courseCode: "INF322",
      professor: "Lioubov Dombrovskaia",
      department: "Informática",
      program: "Ingeniería Civil Informática",
      campus: "Vitacura",
      type: "theoretical",
      hours: 15,
      requirements: ["Nota mínima 5.5", "Interes en interfaces usuarias"],
      description: "Apoyo en certamenes y actividades de clase. Revisión de tareas.",
      applicationDeadline: "26 Oct"
    },
    {
      id: "asst-15",
      courseName: "Estructuras Discretas",
      courseCode: "INF152",
      professor: "Julio Andrés Sotelo Parraguez",
      department: "Informática",
      program: "Ingeniería Civil Informática",
      campus: "Vitacura",
      type: "theoretical",
      hours: 15,
      requirements: ["Nota mínima 5.5", "Interes en enseñar"],
      description: "Apoyo en certamenes y actividades de clase. Revisión de tareas.",
      applicationDeadline: "26 Oct"
    },
    {
      id: "asst-16",
      courseName: "Informática Legal y Derecho Informático",
      courseCode: "INF300",
      professor: "Pedro Felipe Toledo Correa",
      department: "Informática",
      program: "Ingeniería Civil Informática",
      campus: "Vitacura",
      type: "theoretical",
      hours: 15,
      requirements: ["Nota mínima 5.5", "Interes en enseñar"],
      description: "Apoyo en certamenes y actividades de clase. Revisión de tareas.",
      applicationDeadline: "26 Oct"
    },
    {
      id: "asst-17",
      courseName: "Estructuras de Datos y Algoritmos",
      courseCode: "INF134",
      professor: "Ricardo Antonio Salas Letelier",
      department: "Informática",
      program: "Ingeniería Civil Informática",
      campus: "Casa Central",
      type: "theoretical",
      hours: 15,
      requirements: ["Nota mínima 5.5", "Conocimientos en C++"],
      description: "Ayudante encargado de revisión de tareas y apoyo a estudiantes.",
      applicationDeadline: "25 Oct"
    },
    {
      id: "asst-18",
      courseName: "Física General II",
      courseCode: "FIS120",
      professor: "Hector Andres Duarte Portilla",
      department: "Física",
      program: "Ingeniería Civil",
      campus: "Casa Central",
      type: "laboratory",
      hours: 15,
      requirements: ["Nota mínima 6.0", "Experiencia en laboratorio"],
      description: "Supervisión de experimentos en laboratorio. Apoyo en montaje de equipos y corrección de informes de laboratorio.",
      applicationDeadline: "30 Oct"
    },
    {
      id: "asst-19",
      courseName: "Matematica I",
      courseCode: "MAT021",
      professor: "Pablo Felix Gonzalez Lever",
      department: "Matemática",
      program: "Ingeniería Civil",
      campus: "Casa Central",
      type: "theoretical",
      hours: 15,
      requirements: ["Nota mínima 6.5", "Dominio de matrices"],
      description: "Resolución de ejercicios en ayudantías, apoyo en conceptos de la materia.",
      applicationDeadline: "28 Oct"
    },
    {
      id: "asst-20",
      courseName: "Mecanica General",
      courseCode: "IWM151",
      professor: "Francisco Javier Cofre Sanzo",
      department: "Mecánica",
      program: "Ingeniería Civil Mecánica",
      campus: "Casa Central",
      type: "Grader",
      hours: 15,
      requirements: ["Nota mínima 5.8", "Conocimientos de física"],
      description: "Tener motivación y ganas para transmitir conocimiento en mecanica general.",
      applicationDeadline: "22 Oct"
    },
    {
      id: "asst-21",
      courseName: "Estadística Computacional",
      courseCode: "INF280",
      professor: "Juan Ricardo Ñanculef Alegria",
      department: "Informática",
      program: "Ingeniería Civil Informática",
      campus: "Casa Central",
      type: "Research",
      hours: 15,
      requirements: ["Nota mínima 6.0", "Seguridad en laboratorio"],
      description: "Tener motivación y ganas. Conocimiento en estadística.",
      applicationDeadline: "18 Oct"
    },
    {
      id: "asst-22",
      courseName: "Diseño de Interfaces Usuarias",
      courseCode: "INF322",
      professor: "Lioubov Dombrovskaia",
      department: "Informática",
      program: "Ingeniería Civil Informática",
      campus: "Casa Central",
      type: "theoretical",
      hours: 15,
      requirements: ["Nota mínima 5.5", "Interes en interfaces usuarias"],
      description: "Apoyo en certamenes y actividades de clase. Revisión de tareas.",
      applicationDeadline: "26 Oct"
    },
    {
      id: "asst-23",
      courseName: "Estructuras Discretas",
      courseCode: "INF152",
      professor: "Julio Andrés Sotelo Parraguez",
      department: "Informática",
      program: "Ingeniería Civil Informática",
      campus: "Casa Central",
      type: "theoretical",
      hours: 15,
      requirements: ["Nota mínima 5.5", "Interes en enseñar"],
      description: "Apoyo en certamenes y actividades de clase. Revisión de tareas.",
      applicationDeadline: "26 Oct"
    },
    {
      id: "asst-24",
      courseName: "Informática Legal y Derecho Informático",
      courseCode: "INF300",
      professor: "Pedro Felipe Toledo Correa",
      department: "Informática",
      program: "Ingeniería Civil Informática",
      campus: "Casa Central",
      type: "theoretical",
      hours: 15,
      requirements: ["Nota mínima 5.5", "Interes en enseñar"],
      description: "Apoyo en certamenes y actividades de clase. Revisión de tareas.",
      applicationDeadline: "26 Oct"
    },
    {
      id: "asst-25",
      courseName: "Estructuras de Datos y Algoritmos",
      courseCode: "INF134",
      professor: "Ricardo Antonio Salas Letelier",
      department: "Informática",
      program: "Ingeniería Civil Informática",
      campus: "Viña del Mar",
      type: "theoretical",
      hours: 15,
      requirements: ["Nota mínima 5.5", "Conocimientos en C++"],
      description: "Ayudante encargado de revisión de tareas y apoyo a estudiantes.",
      applicationDeadline: "25 Oct"
    },
    {
      id: "asst-26",
      courseName: "Física General II",
      courseCode: "FIS120",
      professor: "Hector Andres Duarte Portilla",
      department: "Física",
      program: "Ingeniería Civil",
      campus: "Viña del Mar",
      type: "laboratory",
      hours: 15,
      requirements: ["Nota mínima 6.0", "Experiencia en laboratorio"],
      description: "Supervisión de experimentos en laboratorio. Apoyo en montaje de equipos y corrección de informes de laboratorio.",
      applicationDeadline: "30 Oct"
    },
    {
      id: "asst-27",
      courseName: "Matematica I",
      courseCode: "MAT021",
      professor: "Pablo Felix Gonzalez Lever",
      department: "Matemática",
      program: "Ingeniería Civil",
      campus: "Viña del Mar",
      type: "theoretical",
      hours: 15,
      requirements: ["Nota mínima 6.5", "Dominio de matrices"],
      description: "Resolución de ejercicios en ayudantías, apoyo en conceptos de la materia.",
      applicationDeadline: "28 Oct"
    },
    {
      id: "asst-28",
      courseName: "Mecanica General",
      courseCode: "IWM151",
      professor: "Francisco Javier Cofre Sanzo",
      department: "Mecánica",
      program: "Ingeniería Civil Mecánica",
      campus: "Viña del Mar",
      type: "Grader",
      hours: 15,
      requirements: ["Nota mínima 5.8", "Conocimientos de física"],
      description: "Tener motivación y ganas para transmitir conocimiento en mecanica general.",
      applicationDeadline: "22 Oct"
    },
    {
      id: "asst-29",
      courseName: "Estadística Computacional",
      courseCode: "INF280",
      professor: "Juan Ricardo Ñanculef Alegria",
      department: "Informática",
      program: "Ingeniería Civil Informática",
      campus: "Viña del Mar",
      type: "Research",
      hours: 15,
      requirements: ["Nota mínima 6.0", "Seguridad en laboratorio"],
      description: "Tener motivación y ganas. Conocimiento en estadística.",
      applicationDeadline: "18 Oct"
    },
    {
      id: "asst-30",
      courseName: "Diseño de Interfaces Usuarias",
      courseCode: "INF322",
      professor: "Lioubov Dombrovskaia",
      department: "Informática",
      program: "Ingeniería Civil Informática",
      campus: "Viña del Mar",
      type: "theoretical",
      hours: 15,
      requirements: ["Nota mínima 5.5", "Interes en interfaces usuarias"],
      description: "Apoyo en certamenes y actividades de clase. Revisión de tareas.",
      applicationDeadline: "26 Oct"
    },
    {
      id: "asst-31",
      courseName: "Estructuras Discretas",
      courseCode: "INF152",
      professor: "Julio Andrés Sotelo Parraguez",
      department: "Informática",
      program: "Ingeniería Civil Informática",
      campus: "Viña del Mar",
      type: "theoretical",
      hours: 15,
      requirements: ["Nota mínima 5.5", "Interes en enseñar"],
      description: "Apoyo en certamenes y actividades de clase. Revisión de tareas.",
      applicationDeadline: "26 Oct"
    },
    {
      id: "asst-32",
      courseName: "Informática Legal y Derecho Informático",
      courseCode: "INF300",
      professor: "Pedro Felipe Toledo Correa",
      department: "Informática",
      program: "Ingeniería Civil Informática",
      campus: "Viña del Mar",
      type: "theoretical",
      hours: 15,
      requirements: ["Nota mínima 5.5", "Interes en enseñar"],
      description: "Apoyo en certamenes y actividades de clase. Revisión de tareas.",
      applicationDeadline: "26 Oct"
    },
    {
      id: "asst-33",
      courseName: "Estructuras de Datos y Algoritmos",
      courseCode: "INF134",
      professor: "Ricardo Antonio Salas Letelier",
      department: "Informática",
      program: "Ingeniería Civil Informática",
      campus: "Concepción",
      type: "theoretical",
      hours: 15,
      requirements: ["Nota mínima 5.5", "Conocimientos en C++"],
      description: "Ayudante encargado de revisión de tareas y apoyo a estudiantes.",
      applicationDeadline: "25 Oct"
    },
    {
      id: "asst-34",
      courseName: "Física General II",
      courseCode: "FIS120",
      professor: "Hector Andres Duarte Portilla",
      department: "Física",
      program: "Ingeniería Civil",
      campus: "Concepción",
      type: "laboratory",
      hours: 15,
      requirements: ["Nota mínima 6.0", "Experiencia en laboratorio"],
      description: "Supervisión de experimentos en laboratorio. Apoyo en montaje de equipos y corrección de informes de laboratorio.",
      applicationDeadline: "30 Oct"
    },
    {
      id: "asst-35",
      courseName: "Matematica I",
      courseCode: "MAT021",
      professor: "Pablo Felix Gonzalez Lever",
      department: "Matemática",
      program: "Ingeniería Civil",
      campus: "Concepción",
      type: "theoretical",
      hours: 15,
      requirements: ["Nota mínima 6.5", "Dominio de matrices"],
      description: "Resolución de ejercicios en ayudantías, apoyo en conceptos de la materia.",
      applicationDeadline: "28 Oct"
    },
    {
      id: "asst-36",
      courseName: "Mecanica General",
      courseCode: "IWM151",
      professor: "Francisco Javier Cofre Sanzo",
      department: "Mecánica",
      program: "Ingeniería Civil Mecánica",
      campus: "Concepción",
      type: "Grader",
      hours: 15,
      requirements: ["Nota mínima 5.8", "Conocimientos de física"],
      description: "Tener motivación y ganas para transmitir conocimiento en mecanica general.",
      applicationDeadline: "22 Oct"
    },
    {
      id: "asst-37",
      courseName: "Estadística Computacional",
      courseCode: "INF280",
      professor: "Juan Ricardo Ñanculef Alegria",
      department: "Informática",
      program: "Ingeniería Civil Informática",
      campus: "Concepción",
      type: "Research",
      hours: 15,
      requirements: ["Nota mínima 6.0", "Seguridad en laboratorio"],
      description: "Tener motivación y ganas. Conocimiento en estadística.",
      applicationDeadline: "18 Oct"
    },
    {
      id: "asst-38",
      courseName: "Diseño de Interfaces Usuarias",
      courseCode: "INF322",
      professor: "Lioubov Dombrovskaia",
      department: "Informática",
      program: "Ingeniería Civil Informática",
      campus: "Concepción",
      type: "theoretical",
      hours: 15,
      requirements: ["Nota mínima 5.5", "Interes en interfaces usuarias"],
      description: "Apoyo en certamenes y actividades de clase. Revisión de tareas.",
      applicationDeadline: "26 Oct"
    },
    {
      id: "asst-39",
      courseName: "Estructuras Discretas",
      courseCode: "INF152",
      professor: "Julio Andrés Sotelo Parraguez",
      department: "Informática",
      program: "Ingeniería Civil Informática",
      campus: "Concepción",
      type: "theoretical",
      hours: 15,
      requirements: ["Nota mínima 5.5", "Interes en enseñar"],
      description: "Apoyo en certamenes y actividades de clase. Revisión de tareas.",
      applicationDeadline: "26 Oct"
    },
    {
      id: "asst-40",
      courseName: "Informática Legal y Derecho Informático",
      courseCode: "INF300",
      professor: "Pedro Felipe Toledo Correa",
      department: "Informática",
      program: "Ingeniería Civil Informática",
      campus: "Concepción",
      type: "theoretical",
      hours: 15,
      requirements: ["Nota mínima 5.5", "Interes en enseñar"],
      description: "Apoyo en certamenes y actividades de clase. Revisión de tareas.",
      applicationDeadline: "26 Oct"
    },

  ];

  const departments = ["Informática", "Matemática", "Física", "Química", "Mecánica"];
  const campuses = ["San Joaquín", "Vitacura", "Casa Central", "Viña del Mar", "Concepción"];
  const programs = [
    "Ingeniería Civil Informática",
    "Ingeniería Civil",
    "Ingeniería Civil Mecánica",
    "Ingeniería Química"
  ];

  const hasActiveFilters = useMemo(() => {
    return searchTerm !== "" || 
           selectedDepartment !== "all" || 
           selectedType !== "all" || 
           selectedCampus !== "all" || 
           selectedProgram !== "all";
  }, [searchTerm, selectedDepartment, selectedType, selectedCampus, selectedProgram]);

  const filteredAssistantships = useMemo(() => {
    if (!hasActiveFilters) {
      return [];
    }
    
    return availableAssistantships.filter((assistantship) => {
      const matchesSearch = 
        assistantship.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assistantship.professor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assistantship.courseCode.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = 
        selectedDepartment === "all" || assistantship.department === selectedDepartment;
      
      const matchesType = 
        selectedType === "all" || assistantship.type === selectedType;
      
      const matchesCampus = 
        selectedCampus === "all" || assistantship.campus === selectedCampus;
      
      const matchesProgram = 
        selectedProgram === "all" || assistantship.program === selectedProgram;

      return matchesSearch && matchesDepartment && matchesType && matchesCampus && matchesProgram;
    });
  }, [searchTerm, selectedDepartment, selectedType, selectedCampus, selectedProgram, hasActiveFilters]);

  const handleApply = (id: string) => {
    const assistantship = availableAssistantships.find(a => a.id === id);
    
    if (!assistantship) {
      toast({
        title: "Error",
        description: "No se encontró la ayudantía",
        variant: "destructive",
      });
      return;
    }

    if (isApplied(id)) {
      toast({
        title: "Ya postulaste",
        description: "Ya has postulado a esta ayudantía",
        variant: "destructive",
      });
      return;
    }

    addApplication(assistantship);
    
    toast({
      title: "¡Postulación exitosa!",
      description: `Has postulado a ${assistantship.courseName}`,
    });

    // Navigate to dashboard to see the new application
    navigate("/");
  };

  const handleViewDetails = (id: string) => {
    window.location.href = `/assistantship/${id}`;
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedDepartment("all");
    setSelectedType("all");
    setSelectedCampus("all");
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
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
          <div className="lg:col-span-2">
            <label className="text-sm font-medium text-foreground mb-2 block">
              Buscar
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Curso, profesor o sigla..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Campus
            </label>
            <Select value={selectedCampus} onValueChange={setSelectedCampus}>
              <SelectTrigger>
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {campuses.map(campus => (
                  <SelectItem key={campus} value={campus}>{campus}</SelectItem>
                ))}
              </SelectContent>
            </Select>
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
                <SelectItem value="theoretical">Contacto</SelectItem>
                <SelectItem value="grader">Corrector</SelectItem>
                <SelectItem value="laboratory">Laboratorio</SelectItem>
                <SelectItem value="research">Investigación</SelectItem>
                <SelectItem value="administrative">Administrativa</SelectItem>
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
      {!hasActiveFilters ? (
        <Card className="p-8 text-center">
          <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            Comienza tu búsqueda
          </h3>
          <p className="text-muted-foreground">
            Utiliza la barra de búsqueda o los filtros para encontrar ayudantías disponibles.
          </p>
        </Card>
      ) : filteredAssistantships.length === 0 ? (
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
              onApply={isApplied(assistantship.id) ? undefined : handleApply}
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