export function Navbar() {
    return (
      <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"><div>Sysmaker</div></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link " aria-current="page" href="#"><div>File</div></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"><div>View</div></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"><div>Edit</div></a>
          </li>
          <li class="nav-item">
            <a class="nav-link "><div>Settings</div></a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
    );
  }