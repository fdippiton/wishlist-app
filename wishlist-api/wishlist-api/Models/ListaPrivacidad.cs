using System;
using System.Collections.Generic;

namespace wishlist_api.Models;

public partial class ListaPrivacidad
{
    public int LisPrivId { get; set; }

    public string LisPrivPrivacidad { get; set; } = null!;

    public virtual ICollection<ListaRegalo> ListaRegalos { get; set; } = new List<ListaRegalo>();
}
