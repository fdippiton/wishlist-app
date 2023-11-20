namespace wishlist_api.ViewModels
{
    public class ArticulosViewModel
    {
        public int ArtId { get; set; }

        public string ArtNombre { get; set; } = null!;

        public string ArtUrl { get; set; } = null!;

        public int? ArtLisRegId { get; set; }
        public string ArtLisRegNombre { get; set; }

        public string ArtPrioridad { get; set; } = null!;

        public int? ArtRegEstatusId { get; set; }
        public string ArtRegStatus { get; set; }

        public string ArtEstatus { get; set; } = null!;
    }
}
