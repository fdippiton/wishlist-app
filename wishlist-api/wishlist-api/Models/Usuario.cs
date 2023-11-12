using System;
using System.Collections.Generic;

namespace wishlist_api.Models;

public partial class Usuario
{
    public int UsuId { get; set; }

    public string UsuNombre { get; set; } = null!;

    public string UsuApellidos { get; set; } = null!;

    public string UsuCorreo { get; set; } = null!;

    public string UsuContrasena { get; set; } = null!;

    public byte[]? UsuProfilePhoto { get; set; }

    public int? UsuRol { get; set; }

    public string UsuEstatus { get; set; } = null!;

    public virtual ICollection<ListaRegalo> ListaRegalos { get; set; } = new List<ListaRegalo>();

    public virtual Role? UsuRolNavigation { get; set; } 
}
