//$(document).ready(function(){
    generar_menu("menu_generico");
//});

function generar_menu(id){
    $("#" + id).append(
        '<nav>' + 
            '<div class="salir" onclick="javascript:salir();">'+
                'Salir &nbsp;<i class="fa fa-sign-out">	</i>'+
            '</div>'+
            '<ul>' + 
                //'<br>' + 
                '<center><li class="logo"><img id="usr" onclick="takepicture()" class="img-circle" style="margin-top:-3px;" src="img/user.png"></li></center>' + 
                '<center><li class="logo marginTop50px" onclick="leer();"><h2 class="bullet" style="margin-top:0px; color:#005D23"><label style="margin-top:0px;" id="lblNombreMenu"></label></h2></li></center>' + 
                '<center><li class="logo" onclick="leer();"><h2 class="bullet" style="margin-top:0px; color:#005D23"><label style="margin-top:0px;" id="lblPuntos"></label></h2></li></center>' + 
                //'<li class="marginTop30px"><center><a class="logo" href="miPerfil.html"><div class="btn-azul width50"  style="margin-top:0px;"><span class="fa fa-user"></span> Mi perfil</div></a></center></li>' + 
                '<li class="marginTop30px"><center><a class="logo" href="miPerfil.html"><img src="img/btn_menu_perfil.png" width="50%"></a></center></li>'+
                //'<li class="gris"><a class="logo2" href="misPremios.html"><span class="fa fa-gift"></span> Mis premios <span class="fa fa-chevron-right pull-right lineHeight35px"></span></a></li>' + 
                '<li class="marginTop30px"><center><a class="logo" href="misPremios.html"><img src="img/btn_menu_challenge.png" width="90%"></a></center></li>'+
                //'<li class="gris marginTop50px"><a class="logo2" href="todasLasPromociones.html"><span class="fa fa-bullhorn"></span> Promociones <span class="fa fa-chevron-right pull-right lineHeight35px"></span></a></li>' + 
                '<li class=""><center><a class="logo" href="todasLasPromociones.html"><img src="img/btn_menu_promo.png" width="90%"></a></center></li>'+
                //'<li class="gris"><a class="logo2" href="acercaDe.html"><span class="fa fa-info"></span> Acerca de esta App <span class="fa fa-chevron-right pull-right lineHeight35px"></span></a></li>' +
                '<li class=""><center><a class="logo" href="ordena.html"><img src="img/btn_menu_ordena.png" width="90%"></a></center></li>'+
            '</ul><center>' + 
            '<p class="bullet margin-chico"><a class="text-azul" href="invitarAmigos.html">Invitar a mis amigos</a></p>' + 
            '<div class="inline margin-chico" onclick="loginFacebook();"><img class="img-circle" src="img/btnFace.png"/></div>' + 
            '</center>' + 
            '<div style="width:100%; text-align:right;" class="bullet"><a class="text-azul" href="acercaDe.html">i Acerca de esta app</a>&nbsp;&nbsp;</div>'+
		'</nav>'
    );
}