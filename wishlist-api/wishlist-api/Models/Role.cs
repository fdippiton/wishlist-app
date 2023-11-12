using System;
using System.Collections.Generic;

namespace wishlist_api.Models;

public partial class Role
{
    public int RolId { get; set; }

    public string RolNombre { get; set; } = null!;

    public string RolEstatus { get; set; } = null!;

    public virtual ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
}
