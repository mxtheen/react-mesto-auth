function Footer() {
  const date = new Date()
  return (
    <footer className="footer">
      <p className="footer__title">&copy;&nbsp;{date.getFullYear()} Mesto Russia</p>
    </footer>
  );
}

export default Footer;
