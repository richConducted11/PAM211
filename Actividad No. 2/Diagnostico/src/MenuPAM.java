import java.util.Scanner;
class InicioPAM {
    public void mostrarReglamentoPOO() {
        System.out.println("\n=== Reglamento POO ===");
        System.out.println("1. Respeto");
        System.out.println("2. Importante participación activa en orden");
        System.out.println("3. No entregar trabajos incompletos");
        System.out.println("4. No se aplican examen fuera de tiempo");
        System.out.println("5. Plagio de trabajos = 0 para todos");
        System.out.println("6. 3 faltas = Final del parcial");
    }

    public void mostrarLineamientosClassroom() {
        System.out.println("\n=== Lineamientos Classroom ===");
        System.out.println("Entregar los trabajos para su revisión");
        System.out.println("Entregas en PDF");
        System.out.println("Avisos de clase");
        System.out.println("Entregas autorizadas con retraso, 5 Calif Max");
    }

    public void mostrarFechasParciales() {
        System.out.println("\n=== Fechas de Parciales ===");
        System.out.println("1er Parcial: 29-09-25");
        System.out.println("2do Parcial: 03-11-25");
        System.out.println("3er Parcial: 01-12-25");
        System.out.println("Final: 08-12-25");
    }

    public void mostrarPorcentajesParcial() {
        System.out.println("\n=== Porcentajes por Parcial ===");
        System.out.println("1er Parcial: Evidencia de conocimiento: 40% Evidencia de desempeño: 20% Evidencia de producto: 30% Proyecto integrador: 10%");
        System.out.println("2do Parcial: Evidencia de conocimiento: 40% Evidencia de desempeño: 20% Evidencia de producto: 20% Proyecto integrador: 20%");
        System.out.println("3er Parcial: Evidencia de conocimiento: 20% Evidencia de desempeño: 10% Evidencia de producto: 40% Proyecto integrador: 30%");
    }
}
public class MenuPAM{
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        InicioPAM info = new InicioPAM();
        int opcion;
        do{
            System.out.println("\n=== Menú ===");
            System.out.println("1. Reglamento POO");
            System.out.println("2. Lineamientos Clasroom");
            System.out.println("3. Fechas de Parciales");
            System.out.println("4. Porcentajes por Parcial");
            System.out.println("5. Salir");
            System.out.println("Selecciona alguna opción: ");
            opcion = sc.nextInt();
            switch (opcion){
                case 1:
                info.mostrarReglamentoPOO();
                break;
                case 2: 
                info.mostrarLineamientosClassroom();
                break;
                case 3: 
                info.mostrarFechasParciales();
                break;
                case 4: 
                info.mostrarPorcentajesParcial();
                break;
                case 5: 
                System.out.println("No sé como hacerlo con interfaz gráfica xD (saque Gears profe)");
                break;
                default:
                System.out.println("Opción incorrecta. Intentalo de nuevo");
            }
        } while (opcion != 5);
        sc.close();
    }
}