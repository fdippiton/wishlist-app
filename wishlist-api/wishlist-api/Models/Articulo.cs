using System;
using System.Collections.Generic;

namespace wishlist_api.Models;

public partial class Articulo
{
    public int ArtId { get; set; }

    public string ArtNombre { get; set; } = null!;

    public string ArtUrl { get; set; } = null!;

    public int? ArtLisRegId { get; set; }

    public string ArtPrioridad { get; set; } = null!;

    public int? ArtRegEstatusId { get; set; }

    public string ArtEstatus { get; set; } = null!;

    public virtual ListaRegalo? ArtLisReg { get; set; }

    public virtual RegaloEstatus? ArtRegEstatus { get; set; }
}
