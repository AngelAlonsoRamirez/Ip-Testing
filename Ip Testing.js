        theme = app.CreateTheme( "Light" );
        theme.AdjustColor( 35, 0, -10 );
        theme.SetBackColor( "#ff926b" );
        theme.SetBtnTextColor( "black" );
        theme.SetButtonOptions( "custom" );
        theme.SetButtonStyle( "white","white",2,"#999999",0,1,"#ff9000" );
        theme.SetCheckBoxOptions( "dark" );
        theme.SetTextEditOptions( "underline" );
        theme.SetDialogColor( "#ffffffff" );
        theme.SetDialogBtnColor( "#ffeeeeee" );
        theme.SetDialogBtnTxtColor( "#ff666666" );
        theme.SetTitleHeight( 42 );
        theme.SetTitleColor( "#ff888888" ); 
        theme.SetTitleDividerColor( "#ff0099CC" );
        theme.SetTextColor( "#ff666666" );
        app.SetTheme( theme );

function OnStart() {
    app.SetStatusBarColor( "#ff926b" );
    app.SetNavBarColor( "#ff926b" );
    app.PreventScreenLock(true);
	app.SetOrientation("Portrait");  
    app.EnableBackKey( false );

	lay = app.CreateLayout( "Linear", "VCenter,FillXY" );
    layMain = app.CreateLayout( "Linear", "VCenter" );
    layMain.SetSize( 1, app.IsPortrait()?0.92:0.85 )
    lay.AddChild( layMain );
    
var _0xd28813=_0x32e1;function _0x32e1(_0x223d76,_0x1a7b21){var _0x156d88=_0x156d();return _0x32e1=function(_0x32e184,_0x1cc04f){_0x32e184=_0x32e184-0x1e9;var _0x3aa510=_0x156d88[_0x32e184];return _0x3aa510;},_0x32e1(_0x223d76,_0x1a7b21);}(function(_0x202767,_0xb6891e){var _0x237203=_0x32e1,_0x3acc52=_0x202767();while(!![]){try{var _0x343424=parseInt(_0x237203(0x1f2))/0x1+parseInt(_0x237203(0x1eb))/0x2*(-parseInt(_0x237203(0x1ec))/0x3)+-parseInt(_0x237203(0x1ee))/0x4*(parseInt(_0x237203(0x1f0))/0x5)+-parseInt(_0x237203(0x1f8))/0x6+-parseInt(_0x237203(0x1f7))/0x7+-parseInt(_0x237203(0x1f6))/0x8*(parseInt(_0x237203(0x1f3))/0x9)+parseInt(_0x237203(0x1ed))/0xa;if(_0x343424===_0xb6891e)break;else _0x3acc52['push'](_0x3acc52['shift']());}catch(_0x350219){_0x3acc52['push'](_0x3acc52['shift']());}}}(_0x156d,0xc102d));var ver=app[_0xd28813(0x1f4)]();app['GA'](_0xd28813(0x1f1),'UA-168129274-1'),app['GA'](_0xd28813(0x1e9),_0xd28813(0x1ef),{'appName':_0xd28813(0x1f5),'appVersion':ver,'screenName':_0xd28813(0x1ea)});function _0x156d(){var _0xf6482=['send','main','16798arOjab','228lPnkOC','51127960BanWsb','1880qtARAS','screenview','10160TwrprE','create','232902bXkxWW','63WyuKek','GetVersion','Ip\x20Testing','108456ZTTgrg','10123204YFTNxy','8524140mdRqUe'];_0x156d=function(){return _0xf6482;};return _0x156d();}
/*	
	var ver = app.GetVersion();
	app.GA( "create", "UA-XXXXXXXXX-X" );
	app.GA( "send", "screenview", 
	    {"appName":"Ip Testing","appVersion":ver,"screenName":"main"});
*/

	lay = app.CreateLayout( "linear", "VCenter,FillXY" );	
	web = app.CreateWebView( 1.0, 1.0 );
	web.SetOnProgress( web_OnProgess );
	web.LoadUrl( "pag1.html" );
	lay.AddChild( web );
	
	layHoriz = app.CreateLayout( "linear", "Horizontal" );	
	
	app.AddLayout( lay );
	
    labanner = app.CreateLayout("Linear", "Left" );
    banner = app.CreateText( "", 1,-1, "FontAwesome" );   
    banner.SetBackColor( "#ff926b" );
    banner.SetTextSize( '30' ); 
    banner.SetPadding( 12,10,12,10, "dip" );
    banner.SetOnTouch( desplegable );
    labanner.AddChild( banner );
    app.AddLayout( labanner );


    la = app.CreateLayout("Linear", "Absolute," ); 
    b2 = app.CreateText( "[fa-bars]", -1,-1, "FontAwesome" );   
    b2.SetBackColor( "#ff926b" );
    b2.SetTextSize( '30' ); 
    b2.SetPadding( 12,10,12,10, "dip" );
    b2.SetOnTouch( desplegable );
    la.AddChild( b2 );
    app.AddLayout( la );

	CreateDrawer();
	app.AddLayout( lay );
	app.AddDrawer( drawerScroll, "Left", drawerWidth );

}

function desplegable() {
    app.OpenDrawer( "Left" );
    }

function OnBack() {
    if( web.CanGoBack()) {
        web.Back();
        } else {
            var sino = app.CreateYesNoDialog( "¿Desea salir de Ip Testing?" );
            sino.SetButtonText( "Si","No" );
            sino.SetOnTouch(function(result){ if(result=="Yes") app.Exit(); } );
            sino.Show();
            }
            
            function yesNo_OnTouch( result ) {
                if( result=="Yes" ) app.Exit();
                }

    }

function web_OnProgess( progress ) {
	app.Debug( "progress = " + progress );
	if( progress==100 ) app.HideProgress();
}


function web_OnProgess( progress ) {
	app.Debug( "progress = " + progress );
	if( progress==100 ) app.HideProgress();
}


function CreateDrawer() {
	drawerWidth = 0.75;
    drawerScroll = app.CreateScroller( drawerWidth, -1, "FillY" );
    drawerScroll.SetBackColor( "#f79071" );
	layDrawer = app.CreateLayout( "Linear", "Left" );
	drawerScroll.AddChild( layDrawer );
	
	layDrawerTop = app.CreateLayout( "Absolute" );
	layDrawerTop.SetBackground( "Img/fondo.png" );
	layDrawerTop.SetSize( drawerWidth, 0.23 );
	layDrawer.AddChild( layDrawerTop );
	
	var img = app.CreateImage( "Img/logo.png", 0.15 );
	img.SetPosition( drawerWidth*0.06, 0.04 );
	layDrawerTop.AddChild( img );
	
	var txtUser = app.CreateText( "Ip Testing",-1,-1,"Bold");
	txtUser.SetPosition( drawerWidth*0.07, 0.155 );
	txtUser.SetTextColor( "White" );
	txtUser.SetTextSize( 25.7, "dip" );
	layDrawerTop.AddChild( txtUser );
	
	
	var layMenu = app.CreateLayout( "Linear", "Left" );
	layDrawer.AddChild( layMenu );


    var listItems = "Mascara de red decimal punteado::[fa-minus],Mascara de red decimal punteado::[fa-minus],Calculadora de subred de clase C::[fa-minus],Número de direcciones requeridas para la máscara de red::[fa-minus],Dirección IP a binario y hexadecimal::[fa-minus],Máscara de red para la cantidad de direcciones utilizables::[fa-minus],Conversores::[fa-minus]";
    lstMenu1 = app.CreateList( listItems, drawerWidth, -1, "Menu,Expand" );
    lstMenu1.SetColumnWidths( -1, 0.40, 0.18 );
    lstMenu1.SelectItemByIndex( 0, true );
    lstMenu1.SetItemByIndex( 0, "Calculadora de red y dirección IP");
    lstMenu1.SetOnTouch( lstMenu_OnTouch );
    layMenu.AddChild( lstMenu1 );
    
    var sep = app.CreateImage( null, drawerWidth,0.001,"fix", 2,2 );
    sep.SetSize( -1, 1, "px" );
    sep.SetColor( "#cccccc" );
    layMenu.AddChild( sep );
    
	
    var listItems = "Ayuda::[fa-info-circle],GitHub::[fa-github]";
    lstMenu2 = app.CreateList( listItems, drawerWidth, -1, "Menu,Expand" );
    lstMenu2.SetColumnWidths( -1, 0.35, 0.18 );
    lstMenu2.SetOnTouch( lstMenu_OnTouch );
    layMenu.AddChild( lstMenu2 );

	txtTitle = app.CreateText( "App desarrollada por Ángel Alonso",-1,-1,"Left");
	txtTitle.SetTextColor( "#666666" );
	txtTitle.SetMargins( 16,12,0,0, "dip" );
	txtTitle.SetTextSize( 14, "dip" );
	layMenu.AddChild( txtTitle );	

}

function lstMenu_OnTouch( title, body, type, index ) {
    app.CloseDrawer( "Left" );
    
    if( this==lstMenu1 ) lstMenu2.SelectItemByIndex(-1);
    else lstMenu1.SelectItemByIndex(-1);
    this.SelectItemByIndex( index, true );
    
    title = title.replace(/Calculadora de red y dirección IP/gi,'pag1');
    title = title.replace(/Mascara de red decimal punteado/gi,'pag2');
    title = title.replace(/Calculadora de subred de clase C/gi,'pag3');
    title = title.replace(/Número de direcciones requeridas para la máscara de red/gi,'pag4');
    title = title.replace(/Dirección IP a binario y hexadecimal/gi,'pag5');
    title = title.replace(/Máscara de red para la cantidad de direcciones utilizables/gi,'pag7');
    title = title.replace(/Conversores/gi,'pag8');
    title = title.replace(/Ayuda/gi,'info');
    title = title.replace(/GitHub/gi,'github');
    
    if (title==="github") {
        app.OpenUrl( "https://github.com/AngelAlonsoRamirez/Ip-Testing");
        } else {
            web.LoadUrl( title + ".html")
        }

    
}


function OnDrawer( side, state ) {
    console.log( side + " : " + state );
}

function OnMenu( name ) {
    app.OpenDrawer();
}