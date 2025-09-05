import java.util.Scanner;
class InicioPAM {
    public void mostrarReglamentoPOO() {
        System.out.println("\n=== Reglamento POO ===");
        System.out.println("1. Respeto", "\n2. Importante participación activa en orden", "\n3. No entregar trabajos incompletos", "\n4. No se aplican examen fuera de tiempo", "\n5. Plagio de trabajos = 0 para todos", "\n6. 3 faltas = Final del parcial");
    }

    public void mostrarLineamientosClassroom() {
        System.out.println("\n=== Lineamientos Classroom ===");
        System.out.println("Entregar los trabajos para su revisión", "\nEntregas en PDF", "\nAvisos de clase", "\nEntregas autorizadas con retraso, 5 Calif Max");
    }

    public void mostrarFechasParciales() {
        System.out.println("\n=== Fechas de Parciales ===");
        System.out.println("1er Parcial: 29-09-25", "\n2do Parcial: 03-11-25", "\n3er Parcial: 01-12-25", "\nFinal: 08-12-25");
    }

    public void mostrarPorcentajesParcial() {
        System.out.println("\n=== Porcentajes por Parcial ===");
        System.out.println("1er Pracial: \nEvidencia de conocimiento: 40% \nEvidencia de desempeño: 20% \nEvidencia de producto: 30% \nProyecto integrador: 10%");
    }
}
public class MenuPAM{
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        InicioPAM info = new InicioPAM();
        int opcion;
    }
}
public class InicioPAM{

}