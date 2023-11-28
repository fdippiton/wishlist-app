export function Footer() {
  var styles = {
    // position: "fixed",
    bottom: 0,
    width: "100%",
    backgroundColor: "#D9D2E9",
    textAlign: "center",
    padding: "10px 0",
    fontSize: "13px",
    marginTop: "15px",
  };

  return (
    <footer className=" text-center py-3" style={styles}>
      <div className="container">
        <p className="m-0">&copy; 2023 Wishlist</p>
      </div>
    </footer>
  );
}
