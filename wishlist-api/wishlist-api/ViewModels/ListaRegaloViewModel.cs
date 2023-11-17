namespace wishlist_api.ViewModels
{
    public class ListaRegaloViewModel
    {
        public int LisRegId { get; set; }

        public string LisRegNombre { get; set; } = null!;

        public DateTime LisRegFecCreacion { get; set; }

        public int? LisRegUsuarioId { get; set; }
        public string LisRegUsuario { get; set; }
        public string LisRegUsuarioApellido { get; set; }
        public int? LisRegUsuarioRolId { get; set; }

        public string LisRegUsuarioRol { get; set; }

        public int? LisRegLisPrivId { get; set; }
        public string LisRegLisPriv { get; set; }

        public string LisRegEstatus { get; set; } = null!;
    }
}
