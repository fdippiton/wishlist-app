using System;
using System.Collections.Generic;

namespace wishlist_api.Models;

public partial class RegaloEstatus
{
    public int RegEstatusId { get; set; }

    public string RegEstatus { get; set; } = null!;

    public virtual ICollection<Articulo> Articulos { get; set; } = new List<Articulo>();
}
