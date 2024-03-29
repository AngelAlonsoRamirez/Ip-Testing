function h_initArray() {
    this.length = h_initArray.arguments.length;
    for (var i = 0; i < this.length; i++)
        this[i] = h_initArray.arguments[i];
}
    
function h_from10toradix(value,radix) {
    var retval = '';
    var ConvArray = new h_initArray(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F');
    var intnum;
    var tmpnum;
    var i = 0;

    intnum = parseInt(value,10);
    if (isNaN(intnum)) {
        retval = 'NaN';
    }else{
        if (intnum < 1) {
            retval ="0";
        }else{
            retval = "";
        }
        while (intnum > 0.9) {
            i++;
            tmpnum = intnum;

            retval = ConvArray[tmpnum % radix] + retval;  
            intnum = Math.floor(tmpnum / radix);
            if (i > 100) {

                retval = 'NaN';
                break;
            }
        }
    }
    return retval;
}

function h_paddto2(str) {
    while(str.length <2) {
        str= "0" + str;
    }
    return(str);
}

function h_paddto8(str) {
    while(str.length <8) {
        str= "0" + str;
    }
    return(str);
}


function h_countbitsfromleft(num) {
    if (num == 255 ) {
        return(8);
    }
    i = 0;
    bitpat=0xff00; 
    while (i < 8) {
        if (num == (bitpat & 0xff)) {
            return(i);
        }
        bitpat=bitpat >> 1;
        i++;
    }
    return(Number.NaN);
}

function calcNWbits(maskip) {
    var sumofbits=0;
    var bitsfromleft;
    bitsfromleft=h_countbitsfromleft(maskip[0]);
    if (isNaN(bitsfromleft)) {
        return(-1);
    }
    sumofbits+=bitsfromleft;

    bitsfromleft=h_countbitsfromleft(maskip[1]);
    if (isNaN(bitsfromleft)) {
        return(-1);
    }
    sumofbits+=bitsfromleft;

    bitsfromleft=h_countbitsfromleft(maskip[2]);
    if (isNaN(bitsfromleft)) {
        return(-1);
    }
    sumofbits+=bitsfromleft;

    bitsfromleft=h_countbitsfromleft(maskip[3]);
    if (isNaN(bitsfromleft)) {
        return(-1);
    }
    sumofbits+=bitsfromleft;
    return(sumofbits);
}

function calcNWbits_formfill(cform) {
    var maskip=[];
    var tmpvar=0;
    tmpvar = parseInt(cform.snm_1.value,10);
    if (isNaN(tmpvar)) {
        cform.result.value = 'no valido';
        return;
    }
    maskip[0]=tmpvar;
    tmpvar = parseInt(cform.snm_2.value,10);
    if (isNaN(tmpvar)) {
        cform.result.value = 'no valido';
        return;
    }
    maskip[1]=tmpvar;
    tmpvar = parseInt(cform.snm_3.value,10);
    if (isNaN(tmpvar)) {
        cform.result.value = 'no valido';
        return;
    }
    maskip[2]=tmpvar;
    tmpvar = parseInt(cform.snm_4.value,10);
    if (isNaN(tmpvar)) {
        cform.result.value = 'no valido';
        return;
    }
    maskip[3]=tmpvar;
    tmpvar=calcNWbits(maskip);
    if(tmpvar<0) {
        cform.result.value = 'no valido';
        return;
    }
    cform.result.value =tmpvar;
}

function resetform1(cform) {
    cform.result.value="";
    cform.snm_1.value=255;
    cform.snm_2.value=255;
    cform.snm_3.value=255;
    cform.snm_4.value=0;
}


function h_fillbitsfromleft(num) {
    if (num >= 8 ) {
        return(255);
    }
    bitpat=0xff00; 
    while (num > 0) {
        bitpat=bitpat >> 1;
        num--;
    }
    return(bitpat & 0xff);
}

function fillhexNWmask(cform) {
    var tmpvar;
    tmpvar=cform.snm_1.value;
    cform.hex_1.value = h_paddto2(h_from10toradix(tmpvar,16));
    tmpvar=cform.snm_2.value;
    cform.hex_2.value = h_paddto2(h_from10toradix(tmpvar,16));
    tmpvar=cform.snm_3.value;
    cform.hex_3.value = h_paddto2(h_from10toradix(tmpvar,16));
    tmpvar=cform.snm_4.value;
    cform.hex_4.value = h_paddto2(h_from10toradix(tmpvar,16));
}

function calcNWmask(cform,netbits) {
    if (isNaN(netbits) || netbits > 32 || netbits < 0) {
        cform.snm_1.value = 'Error';
        cform.snm_2.value="";
        cform.snm_3.value="";
        cform.snm_4.value="";
        return(1);
    }
    cform.snm_1.value=0;
    cform.snm_2.value=0;
    cform.snm_3.value=0;
    cform.snm_4.value=0;
    if (netbits >= 8) {
        cform.snm_1.value = 255;
        netbits-=8;
    }else{
        cform.snm_1.value = h_fillbitsfromleft(netbits);
        return(0);
    }
    if (netbits >= 8) {
        cform.snm_2.value = 255;
        netbits-=8;
    }else{
        cform.snm_2.value = h_fillbitsfromleft(netbits);
        return(0);
    }
    if (netbits >= 8) {
        cform.snm_3.value = 255;
        netbits-=8;
    }else{
        cform.snm_3.value = h_fillbitsfromleft(netbits);
        return(0);
    }
    cform.snm_4.value = h_fillbitsfromleft(netbits);
    return(0);
}


function resetform3(cform) {
    cform.ip_1.value=10;
    cform.ip_2.value=0;
    cform.ip_3.value=0;
    cform.ip_4.value=255;
    cform.bits_1.value="";
    cform.bits_2.value="";
    cform.bits_3.value="";
    cform.bits_4.value="";
    cform.hex_1.value="";
    cform.hex_2.value="";
    cform.hex_3.value="";
    cform.hex_4.value="";
}

function calcBinBits(cform) {
    cform.bits_1.value="";
    cform.bits_2.value="";
    cform.bits_3.value="";
    cform.bits_4.value="";

    tmpvar = parseInt(cform.ip_1.value,10);
    if (isNaN(tmpvar) || tmpvar < 0 || tmpvar > 255) {
        cform.bits_1.value = 'Error';
        return;
    }
    cform.bits_1.value = h_paddto8(h_from10toradix(tmpvar,2));
    cform.hex_1.value = h_paddto2(h_from10toradix(tmpvar,16));

    tmpvar = parseInt(cform.ip_2.value,10);
    if (isNaN(tmpvar) || tmpvar < 0 || tmpvar > 255) {
        cform.bits_2.value = 'Error';
        return;
    }
    cform.bits_2.value = h_paddto8(h_from10toradix(tmpvar,2));
    cform.hex_2.value = h_paddto2(h_from10toradix(tmpvar,16));

    tmpvar = parseInt(cform.ip_3.value,10);
    if (isNaN(tmpvar)  || tmpvar < 0 || tmpvar > 255) {
        cform.bits_3.value = 'Error';
        return;
    }
    cform.bits_3.value = h_paddto8(h_from10toradix(tmpvar,2));
    cform.hex_3.value = h_paddto2(h_from10toradix(tmpvar,16));

    tmpvar = parseInt(cform.ip_4.value,10);
    if (isNaN(tmpvar) || tmpvar < 0 || tmpvar > 255) {
        cform.bits_4.value = 'Error';
        return;
    }
    cform.bits_4.value = h_paddto8(h_from10toradix(tmpvar,2));
    cform.hex_4.value = h_paddto2(h_from10toradix(tmpvar,16));
}


function reset_rest_from4(cform) {
    cform.bcast_1.value ="";
    cform.bcast_2.value ="";
    cform.bcast_3.value ="";
    cform.bcast_4.value ="";

    cform.nwadr_1.value ="";
    cform.nwadr_2.value ="";
    cform.nwadr_3.value ="";
    cform.nwadr_4.value ="";

    cform.firstadr_1.value ="";
    cform.firstadr_2.value ="";
    cform.firstadr_3.value ="";
    cform.firstadr_4.value ="";

    cform.lastadr_1.value ="";
    cform.lastadr_2.value ="";
    cform.lastadr_3.value ="";
    cform.lastadr_4.value ="";

    cform.snm_1.value ="";
    cform.snm_2.value ="";
    cform.snm_3.value ="";
    cform.snm_4.value ="";


    cform.hex_1.value="";
    cform.hex_2.value="";
    cform.hex_3.value="";
    cform.hex_4.value="";
    cform.errortxt.value="";
}

function resetform4(cform) {
    cform.ip.value="192.168.10.5/24";
    reset_rest_from4(cform);
}

function calNBFL(cform) {
    var rt=0;
    reset_rest_from4(cform);
    var ip=[];
    var inputstr,firstip,netbits,netbits_str;
    inputstr=cform.ip.value.replace(/[^0-9\.\/ ]/g," ");
    inputstr=inputstr.replace(/[ \t]+/g," ");
    inputstr=inputstr.replace(/^\D+/,"");
    inputstr=inputstr.replace(/\D+$/,"");
    cform.ip.value=inputstr;

    ipaddr_usr_input=inputstr.match(/\d+\.\d+\.\d+\.\d+/g);
    if (ipaddr_usr_input==null || ipaddr_usr_input.length < 1) {
        cform.errortxt.value = 'ERROR: No es una ipv4';
        return(1);
    }
    ip=ipaddr_usr_input[0].match(/\d+/g);
    var i=0;
    while (i < 3) {
        if (isNaN(ip[i]) || ip[i] > 255 || ip[i] < 0) {
            cform.errortxt.value = 'ERROR: ip no valida';
            return(1);
        }
        i++;
    }
    netbits_str=inputstr.match(/\/\d+/);
    if (netbits_str && netbits_str.length==1) {

        netbits=parseInt(netbits_str[0].replace(/\//,""),10);
    }else{
        if (ipaddr_usr_input.length == 2) {
            var maskip=ipaddr_usr_input[1].match(/\d+/g); 
            var i=0;
            while (i < 3) {
                if (isNaN(maskip[i]) || maskip[i] > 255 || maskip[i] < 0) {
                    cform.errortxt.value = 'ERROR: mascara no valida';
                    return(1);
                }
                i++;
            }
            netbits=calcNWbits(maskip);
        }else{
            cform.errortxt.value = 'ERROR: mascara no valida' + ipaddr_usr_input.length;
            return(1);
        }
    }
    if (netbits >32 || netbits<0) {
        cform.errortxt.value = 'ERROR: mascara no valida';
        return(1);
    }
    rt=calcNWmask(cform,netbits);
    if (rt !=0 ) {

        return(1);
    }
    fillhexNWmask(cform);
    if (netbits == 31) {
        cform.numofaddr.value = "dos hosts";
        cform.firstadr_1.value = ip[0] & cform.snm_1.value;
        cform.firstadr_2.value = ip[1] & cform.snm_2.value;
        cform.firstadr_3.value = ip[2] & cform.snm_3.value;
        cform.firstadr_4.value = ip[3] & cform.snm_4.value;

        cform.lastadr_1.value = ip[0] | (~ cform.snm_1.value & 0xff);
        cform.lastadr_2.value = ip[1] | (~ cform.snm_2.value & 0xff);
        cform.lastadr_3.value = ip[2] | (~ cform.snm_3.value & 0xff);
        cform.lastadr_4.value = ip[3] | (~ cform.snm_4.value & 0xff);
        return(1);
    }
    if (netbits == 32) {
        cform.numofaddr.value = "un host";
        cform.firstadr_1.value = ip[0];
        cform.firstadr_2.value = ip[1];
        cform.firstadr_3.value = ip[2];
        cform.firstadr_4.value = ip[3];
        return(1);
    }
    cform.numofaddr.value = Math.pow(2,32 - netbits) - 2;

    cform.bcast_1.value = ip[0] | (~ cform.snm_1.value & 0xff);
    cform.bcast_2.value = ip[1] | (~ cform.snm_2.value & 0xff);
    cform.bcast_3.value = ip[2] | (~ cform.snm_3.value & 0xff);
    cform.bcast_4.value = ip[3] | (~ cform.snm_4.value & 0xff);
    
    cform.nwadr_1.value = ip[0] & cform.snm_1.value;
    cform.nwadr_2.value = ip[1] & cform.snm_2.value;
    cform.nwadr_3.value = ip[2] & cform.snm_3.value;
    cform.nwadr_4.value = ip[3] & cform.snm_4.value;

    cform.firstadr_1.value = cform.nwadr_1.value;
    cform.firstadr_2.value = cform.nwadr_2.value;
    cform.firstadr_3.value = cform.nwadr_3.value;
    cform.firstadr_4.value = parseInt(cform.nwadr_4.value) + 1;

    cform.lastadr_1.value = cform.bcast_1.value;
    cform.lastadr_2.value = cform.bcast_2.value;
    cform.lastadr_3.value = cform.bcast_3.value;
    cform.lastadr_4.value = parseInt(cform.bcast_4.value) - 1;
    return(0);
}


function resetform13(cform) {
    cform.numofaddr.value="";
    cform.numofaddrused.value="";
    cform.bits.value="";
    cform.snm_1.value="";
    cform.snm_2.value="";
    cform.snm_3.value="";
    cform.snm_4.value="";
}

function subnetcalc(cform) {
    var netbits=parseInt(cform.subnetbits.value);
    if (netbits==0) {
        resetform13(cform);
        return(false);
    }
    cform.numofaddr.value = Math.pow(2,32 - netbits) - 2;
    var rt=calcNWmask(cform,netbits);
    if (rt ==0 ) {
        cform.numofaddrused.value=parseInt(cform.numofaddr.value)+2;
    }
}

function resetform6(cform) {
    cform.numofaddr.value=5;
    cform.bits.value="";
    cform.maxaddr.value="";
    cform.snm_1.value="";
    cform.snm_2.value="";
    cform.snm_3.value="";
    cform.snm_4.value="";
}

function calcNeeded(cform) {
    tmpvar = parseInt(cform.numofaddr.value,10);
    if (isNaN(tmpvar) || tmpvar > 0xfffffffe || tmpvar < 1) {
        cform.bits.value="Error";
        cform.snm_1.value="";
        cform.snm_2.value="";
        cform.snm_3.value="";
        cform.snm_4.value="";
        cform.maxaddr.value="";
        return;
    }
    expval=parseInt(Math.log(tmpvar)/Math.log(2)) + 1;
    maxaddrval=Math.pow(2,expval);
    if (maxaddrval - tmpvar < 2) {
        expval+=1;
    }
    cform.maxaddr.value= Math.pow(2,expval) - 2;
    cform.bits.value=32 - expval;
    calcNWmask(cform,cform.bits.value);
}
    
function calcAmount(cform) {
    var netbits;
    netbits= parseInt(cform.bits.value,10);
    if (isNaN(netbits) || netbits > 30 || netbits < 0) {
        cform.numofaddr.value = 'Error';
        cform.maxaddr.value="";
        cform.snm_1.value="";
        cform.snm_2.value="";
        cform.snm_3.value="";
        cform.snm_4.value="";
        return;
    }
    cform.maxaddr.value=Math.pow(2,32 - netbits);
    cform.numofaddr.value=Math.pow(2,32 - netbits)- 2;
    calcNWmask(cform,netbits);
}

function resetform7(cform) {
    cform.numofaddr.value="";
    cform.maxaddr.value="";
    cform.bits.value=27;
    cform.snm_1.value="";
    cform.snm_2.value="";
    cform.snm_3.value="";
    cform.snm_4.value="";
}

function resetform8(cform) {
    cform.ip_1.value=255;
    cform.ip_2.value=255;
    cform.ip_3.value=240;
    cform.ip_4.value=0;
    cform.invert_1.value="";
    cform.invert_2.value="";
    cform.invert_3.value="";
    cform.invert_4.value="";
}

function calcIpInvert(cform) {
    cform.invert_1.value="";
    cform.invert_2.value="";
    cform.invert_3.value="";
    cform.invert_4.value="";

    tmpvar = parseInt(cform.ip_1.value,10);
    if (isNaN(tmpvar) ) {
        cform.invert_1.value = 'NaN';
        return;
    }
    cform.invert_1.value = 0xff & ~ tmpvar;

    tmpvar = parseInt(cform.ip_2.value,10);
    if (isNaN(tmpvar) ) {
        cform.invert_2.value = 'NaN';
        return;
    }
    cform.invert_2.value = 0xff & ~ tmpvar;

    tmpvar = parseInt(cform.ip_3.value,10);
    if (isNaN(tmpvar) ) {
        cform.invert_3.value = 'NaN';
        return;
    }
    cform.invert_3.value = 0xff & ~ tmpvar;

    tmpvar = parseInt(cform.ip_4.value,10);
    if (isNaN(tmpvar) ) {
        cform.invert_4.value = 'NaN';
        return;
    }
    cform.invert_4.value = 0xff & ~ tmpvar;
}

function resetform9(cform) {
    cform.dec_1.value="";
    cform.bin_1.value="";
    cform.num.value="";
}

function convertnum_hex(cform) {
    cform.dec_1.value="";
    cform.bin_1.value="";
    cform.errortxt.value = "";

    var tmpvar=cform.num.value.replace(/0x/i,"");
    cform.num.value=tmpvar; 
    if (! cform.num.value.match(/^[x0-9a-fA-F]+$/)) {
        cform.errortxt.value = 'ERROR: Nº hex no valido';
        return;
    }
    tmpvar = parseInt(cform.num.value,16);
    if (isNaN(tmpvar) ) {
        cform.dec_1.value = 'NaN';
        cform.bin_1.value = 'NaN';
        return;
    }
    cform.dec_1.value = tmpvar;
    cform.bin_1.value = h_from10toradix(tmpvar,2);
}

function resetform10(cform) {
    cform.dec_1.value="";
    cform.hex_1.value="";
    cform.num.value="";
}

function convertnum_bin(cform) {
    cform.dec_1.value="";
    cform.hex_1.value="";
    cform.errortxt.value = "";

    if (! cform.num.value.match(/^[01]+$/)) {
        cform.errortxt.value = 'ERROR: Nª binario no valido';
        return;
    }

    tmpvar = parseInt(cform.num.value,2);
    if (isNaN(tmpvar) ) {
        cform.dec_1.value = 'NaN';
        cform.hex_1.value = 'NaN';
        return;
    }
    cform.dec_1.value = tmpvar;
    cform.hex_1.value = h_from10toradix(tmpvar,16);
}

function resetform11(cform) {
    cform.bin_1.value="";
    cform.hex_1.value="";
    cform.num.value="";
}

function convertnum_dec(cform) {
    cform.bin_1.value="";
    cform.hex_1.value="";
    cform.errortxt.value = "";

    if (! cform.num.value.match(/^\d+$/)) {
        cform.errortxt.value = 'ERROR: Nº decimal no valido.';
        return;
    }
    tmpvar = parseInt(cform.num.value,10);
    if (isNaN(tmpvar) ) {
        cform.bin_1.value = 'NaN';
        cform.hex_1.value = 'NaN';
        return;
    }
    cform.hex_1.value = h_from10toradix(tmpvar,16);
    cform.bin_1.value = h_from10toradix(tmpvar,2);
}

function resetform12(cform) {
    cform.hex.value="0A0000ff";
    cform.ip_1.value="";
    cform.ip_2.value="";
    cform.ip_3.value="";
    cform.ip_4.value="";
    cform.bits_1.value="";
    cform.bits_2.value="";
    cform.bits_3.value="";
    cform.bits_4.value="";
}

function dot2hex(cform) {
    cform.ip_1.value="";
    cform.ip_2.value="";
    cform.ip_3.value="";
    cform.ip_4.value="";
    cform.bits_1.value="";
    cform.bits_2.value="";
    cform.bits_3.value="";
    cform.bits_4.value="";
    tmpvar=cform.hex.value.replace(/0x/i,"");
    cform.hex.value=tmpvar.substr(0,8);

    tmpvar = parseInt(tmpvar,16);
    if (isNaN(tmpvar)) {
        cform.ip_1.value = 'Error';
        return;
    }
    cform.hex.value = h_paddto8(cform.hex.value);
    cform.ip_1.value = parseInt(cform.hex.value.substr(0,2),16);
    cform.bits_1.value=h_paddto8(h_from10toradix(cform.ip_1.value,2));
    cform.ip_2.value = parseInt(cform.hex.value.substr(2,2),16);
    cform.bits_2.value=h_paddto8(h_from10toradix(cform.ip_2.value,2));
    cform.ip_3.value = parseInt(cform.hex.value.substr(4,2),16);
    cform.bits_3.value=h_paddto8(h_from10toradix(cform.ip_3.value,2));
    cform.ip_4.value = parseInt(cform.hex.value.substr(6,2),16);
    cform.bits_4.value=h_paddto8(h_from10toradix(cform.ip_4.value,2));
}