export function Footer() {
  var styles = {
    fontSize: "13px",
    margin: "auto 0px",
  };

  return (
    <footer
      className=" text-center py-2"
      style={{ backgroundColor: "#D3D3D3" }}
    >
      <div className="container">
        <p style={styles}>&copy; 2023 Wishlist</p>
      </div>
    </footer>
  );
}
