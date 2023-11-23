export function Footer() {
  var styles = {
    position: "fixed",
    bottom: 0,
    width: "100%",
    backgroundColor: "#D3D3D3",
    textAlign: "center",
    padding: "10px 0",
    fontSize: "13px",
  };

  return (
    <footer className=" text-center py-3" style={styles}>
      <div className="container">
        <p>&copy; 2023 Wishlist</p>
      </div>
    </footer>
  );
}
