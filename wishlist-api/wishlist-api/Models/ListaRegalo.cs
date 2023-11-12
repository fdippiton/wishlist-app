using System;
using System.Collections.Generic;

namespace wishlist_api.Models;

public partial class ListaRegalo
{
    public int LisRegId { get; set; }

    public string LisRegNombre { get; set; } = null!;

    public DateTime LisRegFecCreacion { get; set; }

    public int? LisRegUsuarioId { get; set; }

    public int? LisRegLisPrivId { get; set; }

    public string LisRegEstatus { get; set; } = null!;

    public virtual ICollection<Articulo> Articulos { get; set; } = new List<Articulo>();

    public virtual ListaPrivacidad? LisRegLisPriv{ get; set; } 

    public virtual Usuario? LisRegUsuario { get; set; } 
}
