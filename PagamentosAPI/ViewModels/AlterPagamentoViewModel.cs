using Flunt.Notifications;
using Flunt.Validations;

public class AlterPagamentoViewModel : Notifiable<Notification>
{
    public Guid Id { get; set; }
    public Guid IdReserva { get; set; }
    public Guid IdUsuario { get; set; }
    public decimal Valor { get; set; }
    public MetodoPagamentoEnum MetodoPagamento { get; set; }

    public Pagamentos MapTo()
    {
        AddNotifications(new Contract<Notification>()
                            .Requires()
                            .IsTrue(Enum.GetValues(typeof(MetodoPagamentoEnum)).Cast<MetodoPagamentoEnum>().Any(s => s == MetodoPagamento),
                                     $"Metodo de Pagamento informado ({(int)MetodoPagamento}) inv�lido")
                            .AreNotEquals(Id, Guid.Empty, "Id de pagamento inv�lido")
                            .AreNotEquals(IdReserva, Guid.Empty, "IdReserva inv�lida")
                            .AreNotEquals(IdUsuario, Guid.Empty, "IdUsuario inv�lido")
                            .IsNotNull(Valor, "O valor do pagamento deve ser informado")
                            .IsGreaterThan(Valor, 0, "O valor do pagamento deve ser maior que 0 (zero)"));

        return new Pagamentos(Id, IdReserva, IdUsuario, Valor, MetodoPagamento, DateTime.Now);
    }
}