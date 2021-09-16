function Sidebar() {
  return (
    <div className="main-sidebar">
      <aside id="sidebar-wrapper">
        <div className="sidebar-brand">
          <a href="index.html">Stisla</a>
        </div>
        <div className="sidebar-brand sidebar-brand-sm">
          <a href="index.html">St</a>
        </div>
        <ul className="sidebar-menu">
          <li className="menu-header">Thống kê</li>
          <li className="active">
            <a href="/admin" className="nav-link no-dropdown">
              <i className="fas fa-fire" />
              <span>Tổng quan</span>
            </a>
          </li>
          <li className="nav-item dropdown">
            <a href="/admin" className="nav-link has-dropdown">
              <i className="fas fa-fire" />
              <span>Xuất báo cáo</span>
            </a>
            <ul className="dropdown-menu">
              <li>
                <a className="nav-link" href="/admin/abc">
                  Theo Học viên
                </a>
              </li>
              <li className="active">
                <a className="nav-link" href="index.html">
                  Theo doanh thu
                </a>
              </li>
            </ul>
          </li>
          <li className="menu-header">Quản lý</li>
          <li>
            <a className="nav-link" href="forms-advanced-form.html">
              <i className="far fa-square" /> <span>Học viên</span>
            </a>
          </li>
          <li>
            <a className="nav-link" href="forms-editor.html">
              <i className="far fa-square" /> <span>Giảng viên</span>
            </a>
          </li>
          <li>
            <a className="nav-link" href="forms-validation.html">
              <i className="far fa-square" /> <span>Nhân viên</span>
            </a>
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default Sidebar;
