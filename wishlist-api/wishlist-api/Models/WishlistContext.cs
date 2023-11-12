using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace wishlist_api.Models;

public partial class WishlistContext : DbContext
{
    public WishlistContext()
    {
    }

    public WishlistContext(DbContextOptions<WishlistContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Articulo> Articulos { get; set; }

    public virtual DbSet<ListaPrivacidad> ListaPrivacidads { get; set; }

    public virtual DbSet<ListaRegalo> ListaRegalos { get; set; }

    public virtual DbSet<RegaloEstatus> RegaloEstatuses { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

//    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
//        => optionsBuilder.UseSqlServer("server=localhost; database=wishlist; integrated security=true; TrustServerCertificate=true;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Articulo>(entity =>
        {
            entity.HasKey(e => e.ArtId).HasName("PK__Articulo__FD7CB55264DDCF15");

            entity.Property(e => e.ArtId).HasColumnName("Art_Id");
            entity.Property(e => e.ArtEstatus)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("Art_Estatus");
            entity.Property(e => e.ArtLisRegId).HasColumnName("Art_LisReg_Id");
            entity.Property(e => e.ArtNombre)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Art_Nombre");
            entity.Property(e => e.ArtPrioridad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Art_Prioridad");
            entity.Property(e => e.ArtRegEstatusId).HasColumnName("Art_Reg_Estatus_Id");
            entity.Property(e => e.ArtUrl)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Art_Url");

            entity.HasOne(d => d.ArtLisReg).WithMany(p => p.Articulos)
                .HasForeignKey(d => d.ArtLisRegId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Articulos__Art_L__440B1D61");

            entity.HasOne(d => d.ArtRegEstatus).WithMany(p => p.Articulos)
                .HasForeignKey(d => d.ArtRegEstatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Articulos__Art_R__44FF419A");
        });

        modelBuilder.Entity<ListaPrivacidad>(entity =>
        {
            entity.HasKey(e => e.LisPrivId).HasName("PK__ListaPri__2A9242E8D525EA23");

            entity.ToTable("ListaPrivacidad");

            entity.Property(e => e.LisPrivId).HasColumnName("LisPriv_Id");
            entity.Property(e => e.LisPrivPrivacidad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LisPriv_Privacidad");
        });

        modelBuilder.Entity<ListaRegalo>(entity =>
        {
            entity.HasKey(e => e.LisRegId).HasName("PK__ListaReg__27A970D4FB840BA3");

            entity.Property(e => e.LisRegId).HasColumnName("LisReg_Id");
            entity.Property(e => e.LisRegEstatus)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("LisReg_Estatus");
            entity.Property(e => e.LisRegFecCreacion)
                .HasColumnType("date")
                .HasColumnName("LisReg_FecCreacion");
            entity.Property(e => e.LisRegLisPrivId).HasColumnName("LisReg_LisPriv_Id");
            entity.Property(e => e.LisRegNombre)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LisReg_Nombre");
            entity.Property(e => e.LisRegUsuarioId).HasColumnName("LisReg_Usuario_Id");

            entity.HasOne(d => d.LisRegLisPriv).WithMany(p => p.ListaRegalos)
                .HasForeignKey(d => d.LisRegLisPrivId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ListaRega__LisRe__3F466844");

            entity.HasOne(d => d.LisRegUsuario).WithMany(p => p.ListaRegalos)
                .HasForeignKey(d => d.LisRegUsuarioId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ListaRega__LisRe__3E52440B");
        });

        modelBuilder.Entity<RegaloEstatus>(entity =>
        {
            entity.HasKey(e => e.RegEstatusId).HasName("PK__RegaloEs__BF96B3AA41CEFB69");

            entity.ToTable("RegaloEstatus");

            entity.Property(e => e.RegEstatusId).HasColumnName("Reg_Estatus_Id");
            entity.Property(e => e.RegEstatus)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Reg_Estatus");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RolId).HasName("PK__Roles__795EBD49FF428AD5");

            entity.Property(e => e.RolId).HasColumnName("Rol_Id");
            entity.Property(e => e.RolEstatus)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("Rol_Estatus");
            entity.Property(e => e.RolNombre)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Rol_Nombre");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.UsuId).HasName("PK__Usuarios__B6173FCB982A0298");

            entity.Property(e => e.UsuId).HasColumnName("Usu_Id");
            entity.Property(e => e.UsuApellidos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Usu_Apellidos");
            entity.Property(e => e.UsuContrasena)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Usu_Contrasena");
            entity.Property(e => e.UsuCorreo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Usu_Correo");
            entity.Property(e => e.UsuEstatus)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("Usu_Estatus");
            entity.Property(e => e.UsuNombre)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Usu_Nombre");
            entity.Property(e => e.UsuProfilePhoto).HasColumnName("Usu_Profile_Photo");
            entity.Property(e => e.UsuRol).HasColumnName("Usu_Rol");

            entity.HasOne(d => d.UsuRolNavigation).WithMany(p => p.Usuarios)
                .HasForeignKey(d => d.UsuRol)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Usuarios__Usu_Ro__398D8EEE");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
