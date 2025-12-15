<?php
session_start();
if(!isset($_SESSION['user_id'])){
  header("Location: login.php");
  exit;
}
require_once 'backend/conexion.php'; // archivo que devuelve $conexion (mysqli)
$userId = intval($_SESSION['user_id']);

// fetch basic user for initial render
$stmt = $conexion->prepare("SELECT id,nombre,email,telefono,avatar FROM users WHERE id = ?");
$stmt->bind_param("i",$userId); $stmt->execute();
$res = $stmt->get_result(); $user = $res->fetch_assoc();
?>
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Dashboard | LK Studio</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link rel="stylesheet" href="css/dashboard_usuario.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>
<body>

<div class="dashboard">
  <aside class="sidebar">
    <div class="brand">
      <img src="assets/img/LK.png" alt="LK">
      <h2>LK Studio</h2>
    </div>
    <ul class="menu">
      <li class="active" data-section="inicio"><i class="fa fa-house"></i> Inicio</li>
      <li data-section="reservaciones"><i class="fa fa-calendar-check"></i> Mis Reservaciones</li>
      <li data-section="datos"><i class="fa fa-user"></i> Mis Datos</li>
      <li data-section="fotos"><i class="fa fa-camera"></i> Mis Fotos</li>
      <li data-section="historial"><i class="fa fa-list"></i> Movimientos</li>
      <li><a href="logout.php"><i class="fa fa-door-open"></i> Cerrar sesión</a></li>
    </ul>
  </aside>

  <main class="content">
    <section id="inicio" class="panel visible">
      <h1>Bienvenido, <span id="userName"><?=htmlspecialchars($user['nombre'])?></span> 👋</h1>
      <p class="sub">Administra tus citas y perfil.</p>

      <div class="cards">
        <div class="card"><i class="fa fa-calendar-check"></i><h3>Reservaciones</h3><p>Ver tus próximas citas</p></div>
        <div class="card"><i class="fa fa-user"></i><h3>Mis Datos</h3><p>Edita tu información</p></div>
        <div class="card"><i class="fa fa-camera"></i><h3>Fotos</h3><p>Sube testimonios</p></div>
        <div class="card"><i class="fa fa-list"></i><h3>Historial</h3><p>Actividad de la cuenta</p></div>
      </div>
    </section>

    <section id="reservaciones" class="panel">
      <h2>Mis Reservaciones</h2>
      <table class="tabla">
        <thead><tr><th>Servicio</th><th>Fecha</th><th>Hora</th><th>Estado</th></tr></thead>
        <tbody id="tablaReservas"><tr><td colspan="4">Cargando...</td></tr></tbody>
      </table>
    </section>

    <section id="datos" class="panel">
      <h2>Mis Datos</h2>
      <form class="form" method="post" action="api/update_user.php" enctype="multipart/form-data">
        <label>Nombre</label>
        <input id="nombre" name="nombre" value="<?=htmlspecialchars($user['nombre'])?>">

        <label>Teléfono</label>
        <input id="tel" name="telefono" value="<?=htmlspecialchars($user['telefono'])?>">

        <label>Correo</label>
        <input id="correo" name="email" value="<?=htmlspecialchars($user['email'])?>">

        <label>Avatar (opcional)</label>
        <input type="file" name="avatar">

        <button class="btn" type="submit">Guardar Cambios</button>
      </form>
    </section>

    <section id="fotos" class="panel">
      <h2>Mis Fotos y Testimonios</h2>
      <div class="upload-box">
        <input id="fotoSubir" type="file" accept="image/*">
        <button class="btn" id="btnUpload">Subir Imagen</button>
      </div>
      <div class="gallery" id="galeria"></div>

      <div class="stars" style="margin-top:14px">
        <p>Califica tu experiencia:</p>
        <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-half"></i><i class="fa fa-star"></i>
      </div>
    </section>

    <section id="historial" class="panel">
      <h2>Historial de Movimientos</h2>
      <ul class="lista"></ul>
    </section>
  </main>
</div>

<script>
  // expose current user id for JS if needed
  window.LK = { userId: <?=json_encode($user['id'])?> };
</script>
<script src="js/dashboard_usuario.js"></script>
</body>
</html>
