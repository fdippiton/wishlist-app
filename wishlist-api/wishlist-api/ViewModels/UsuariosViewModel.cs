namespace wishlist_api.ViewModels
{
    public class UsuariosViewModel
    {
        public int UsuId { get; set; }

        public string UsuNombre { get; set; } = null!;

        public string UsuApellidos { get; set; } = null!;

        public string UsuCorreo { get; set; } = null!;

        public string UsuContrasena { get; set; } = null!;

        public byte[]? UsuProfilePhoto { get; set; }

        public int? UsuRol { get; set; }

        public string UsuEstatus { get; set; } = null!;
    }
}
