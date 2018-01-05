function loginRealm()
{
    var registro = JSON.parse(localStorage.getItem('pughpharm'));
    snog_dispatcher.broadcast(Snog.events.REALM_LOGIN, {token: registro.codigo, realm:"easier_loyalty"});
}



function getBoardInstances()
{
    snog_dispatcher.broadcast(Snog.events.GET_BOARDS_INSTANCES, {type:'special', player_id:parseInt(localStorage.getItem('player_id')) });
}




function getBagInstance(board,slot,nslots)
{
    var cad='';
    $('#board_'+board).html('');
    for(var iPunch=0; iPunch<nslots; iPunch++)
    {
        cad+='<img id="slot'+iPunch+'" img src="'+slot+'" style="margin: 3px 5px" />';
    }
    $('#board_'+board).html(cad);
    /*
    var tds="<tr>";
    var j=0;

    for(j=0; j<board_size;j++)
        tds+='<td id="slot'+j+'"><img width="30" src="'+slot+'" /></td>';

    tds+="</tr>";

    $('<table><tr><td colspan="'+board_size+'"><b>'+title+'</b></td></tr><tr><td colspan="'+board_size+'"><img width="100%" src="'+cover+'" /></td></tr>'+tds+'</table>').appendTo('.contenidoDetallePunchCard');*/


    snog_dispatcher.broadcast(Snog.events.LOAD_BOARD_INSTANCE_BAG, { board_instance_id:parseInt(board) });
}



$(document).ready(function(){
    // Initialize Snog engine;
    Snog.all();
    Snog.debug = false;

    snog_data = Snog.require('data');
    snog_dispatcher = Snog.require('dispatcher');



    snog_dispatcher.on(Snog.events.LOGIN_SUCCESS, function (data) 
    {
        //Guardamos en el local storage los datos de referencia a PICNIC
        localStorage.setItem('player_id',data.player_id);
        localStorage.setItem('auth_token',data.auth_token);

        //Extraemos las punchcards en las que participa el usuario
        getBoardInstances();
    });

    

    snog_dispatcher.on(Snog.events.GET_BOARDS_INSTANCES_SUCCESS, function (data) 
    {
        $("#contenedorBoardInstances").html('');
        var boardsProcessed=0;
        var banderaBoardsValidos=false;
        
        
        
        jQuery.each(data, function(i, val) 
        {   
            boardsProcessed++;
            if(val.empty===false)
            {
                //$("#divDebug").html(JSON.stringify(val));
                banderaBoardsValidos=true;
                var assetsProcessed = 0;
                var assetPrevio='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';
                var assetCover='';
                var assetSlot='';
                jQuery.each(val.board_instance.assets, function(i, asset) 
                {  
                    assetsProcessed++;
                    if(asset.kind=='preview')
                        assetPrevio=asset.uri;
                    if(asset.kind=='cover')
                        assetCover=asset.uri;
                    if(asset.kind=='slot')
                        assetSlot=asset.uri;
                    if(assetsProcessed===val.board_instance.assets.length)
                    {
                        var cad='<div style="margin-top:60px" class="objetivosMision width100 inline"><img width="100%" src="'+assetPrevio+'" class="img-icono"><div id="board_'+val.board_instance.board_instance_id+'" style="background-color:#fff; height:50px; width:100%; position: relative; top:-60px;">';
                        
                        cad+='</div></div>';
                        $(cad).appendTo("#contenedorBoardInstances");
                        getBagInstance(val.board_instance.board_instance_id,assetSlot,val.board_instance.size);
                    }
                    
                });
            }

            if(boardsProcessed===data.length)
            {
                if(banderaBoardsValidos==false)
                    $("#contenedorBoardInstances").html('<p class="alert alert-warning">No hay punchcards disponibles</p>');
            }
        });
    });


    snog_dispatcher.on(Snog.events.LOAD_BOARD_INSTANCE_BAG_SUCCESS, function (data) 
    {
                
        //Mostramos un dialogo con la información
        jQuery.each(data.bag_items, function(i, val) 
        {
            $("#slot"+val.slot_id).attr('src', val.item_instance.assets[0].uri);
            //$("#slot"+val.slot_id).html('<img src="'+val.item_instance.assets[0].uri+'" width="30"/>');
        });
        if(data.bag_items.length==data.size)
            $('<input type="button" class="btn btn-success" value="Obtener cupón" onclick="obtenerCupon('+data.bag_items[0].item_instance.metadata[0].value+');"/>').appendTo('.contenidoDetallePunchCard');
        //$('#dialogDetallePunchCard').show();
        
    });
    

});
