using System.ComponentModel.DataAnnotations.Schema;

public class Vaga
{
    public Vaga() { }
    public Vaga(Guid id, Guid idEstacionamento, StatusVagaEnum status, TipoVagaEnum tipoVaga, decimal valorHora)
    {
        Id = id;
        IdEstacionamento = idEstacionamento;
        Status = status;
        TipoVaga = tipoVaga;
        ValorHora = valorHora;
    }

    public Guid Id { get; set; }
    public Guid IdEstacionamento { get; set; }
    [NotMapped]
    public string? NomeEstacionamento { get; set; }
    public StatusVagaEnum Status { get; set; }
    public string? StatusDescricao => Enum.GetName(Status);
    public TipoVagaEnum TipoVaga { get; set; }
    public string? TipoVagaDescricao => Enum.GetName(TipoVaga);
    public decimal ValorHora { get; set; }
}
