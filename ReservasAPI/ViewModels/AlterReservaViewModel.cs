using Flunt.Notifications;
using Flunt.Validations;

namespace ReservasAPI.ViewModels
{
    public class AlterReservaViewModel : Notifiable<Notification>
    {
        public Guid Id { get; set; }
        public Guid IdEstacionamento { get; set; }
        public Guid IdVaga { get; set; }
        public Guid IdUsuario { get; set; }
        public DateTime DataInicio { get; set; }
        public DateTime DataFim { get; set; }
        public StatusReservaEnum StatusReserva { get; set; }

        public Reservas MapTo()
        {
            AddNotifications(new Contract<Notification>()
                .Requires()
                .IsTrue(Enum.GetValues(typeof(StatusReservaEnum)).Cast<StatusReservaEnum>().Any(s => s == StatusReserva),
                        $"Status informado ({(int)StatusReserva}) inv�lido")
                .AreNotEquals(IdEstacionamento, Guid.Empty, "IdEstacionamento inv�lido")
                .AreNotEquals(IdVaga, Guid.Empty, "IdVaga inv�lido")
                .AreNotEquals(IdUsuario, Guid.Empty, "IdUsuario inv�lido")
                .IsGreaterThan(DataInicio, DateTime.Now.AddDays(1), "Reserva deve ser realizada com pelo menos um dia de antecedencia")
                .IsGreaterThan(DataInicio, DateTime.MinValue, "O inicio da reserva deve ser informado")
                .IsLowerThan(DataInicio, DateTime.MaxValue, "Data de inicio da reserva inv�lida")
                .IsGreaterThan(DataFim, DateTime.MinValue, "O final da reserva deve ser informado")
                .IsLowerThan(DataFim, DateTime.MaxValue, "Data final da reserva inv�lida")
                .IsGreaterThan(DataFim, DataInicio, "O final da reserva deve ser posterior � data inicial")
                .IsGreaterThan(DataFim, DateTime.Now, "O final da reserva deve ser posterior � data de atual"));

            return new Reservas(Id, IdEstacionamento, IdVaga, IdUsuario, DataInicio, DataFim, StatusReserva);
        }
    }
}
