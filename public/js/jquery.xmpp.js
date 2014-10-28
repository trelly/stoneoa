(function($){
        
        var rid = "3000000000";
        var sid;
        var settings;
        var connected = false;
        var jid;

        $.fn.xmpp = function(options) {
                if($.extend({}, $.fn.xmpp.defaults, options).cmd != null)
                {//Command
                        var settingsTemp = $.extend({}, $.fn.xmpp.defaults, options);
                        if(connected)
                        {
                                var cmd = settingsTemp.cmd;
                                //rid++;
                                var rid = nextRid();
                                if(cmd == "message")
                                {
                                        msg = "<body rid='"+rid+"' xmlns='http://jabber.org/protocol/httpbind' sid='"+sid+"'><message from='"+jid+"/Wixet' type='chat' to='"+settingsTemp.to+"' xmlns='jabber:client'><body>"+settingsTemp.message+"</body></message></body>";
                                        
                                }else if(cmd == "changeStatus"){
                                        
                                        msg ="<body rid='"+rid+"' xmlns='http://jabber.org/protocol/httpbind' sid='"+sid+"'><presence from='"+jid+"/Wixet' xmlns='jabber:client'><show>"+settingsTemp.status+"</show></presence></body>";
                                }else if(cmd == "vcard"){
                                        if(settingsTemp.to == null)
                                        
                                                msg ="<body rid='"+rid+"' xmlns='http://jabber.org/protocol/httpbind' sid='"+sid+"'><iq from='"+jid+"/Wixet' id='v1' type='get' xmlns='jabber:client'><vCard xmlns='vcard-temp'/></iq></body>";
                                        else
                                                msg ="<body rid='"+rid+"' xmlns='http://jabber.org/protocol/httpbind' sid='"+sid+"'><iq from='"+jid+"/Wixet' id='v3' to='"+settingsTemp.to+"' type='get' xmlns='jabber:client'><vCard xmlns='vcard-temp'/></iq></body>";
        
                                }else if(cmd == "changeName"){
                                        msg ="<body rid='"+rid+"' xmlns='http://jabber.org/protocol/httpbind' sid='"+sid+"'><iq type='set' id='v2' xmlns='jabber:client'><vCard xmlns='vcard-temp'><FN>"+settingsTemp.name+"</FN></vCard></iq></body>";
                                }else if(cmd == "raw")
                                {
                                        msg = "<body rid='"+rid+"' xmlns='http://jabber.org/protocol/httpbind' sid='"+sid+"'>"+settingsTemp.message+"</body>";
                                }
                                else if(cmd == "disconnect")
                                {
                                        disconnect();
                                        return;
                                }
        
                                $.post("/http-bind",msg,
                                        function(data)
                                        {
                                                var body = $(data).find("body");                        
                                                if(body.children().length > 0)
                                                {
                                                        messageHandler(data);
                                                        escuchar();
                                                }
                                        });
                        }else{
                                rid = "3000000000";
                                connect(settings.jid,settings.password);
                        }
                        return;
                }else{
                        settings = $.extend({}, $.fn.xmpp.defaults, options);
                        jid = settings.jid;
                        connect(settings.jid,settings.password);
                }
                
        };      

        function disconnect(){
                msg ="<body rid='"+rid+"'"+
              " sid='"+sid+"'"+
              " type='terminate'"+
              " xmlns='http://jabber.org/protocol/httpbind'>"+
              " <presence type='unavailable'"+
              " xmlns='jabber:client'/>"+
              " </body>";
                
                $.post("/http-bind",msg,
                                function(data)
                                {
                                        connected = false;
                                        try{settings.onDisconnect(msg);}catch(e){}
                                });
        }
        function nextRid()
        {
                rid++;
                return rid;
        }
        
        function connect(jid,password)
        {
                var domain = jid.split("@")[1];
                var user = jid.split("@")[0];
                
                var envio = "<body rid='"+rid+"' xmlns='http://jabber.org/protocol/httpbind' to='"+domain+"' xml:lang='en' wait='60' hold='1' content='text/xml; charset=utf-8' ver='1.6' xmpp:version='1.0' xmlns:xmpp='urn:xmpp:xbosh'/>";
                $.post("/http-bind",envio,function(data){
                        sid = $(data).find("body").attr("sid");
                        rid++;
                         envio = "<body rid='"+rid+"' xmlns='http://jabber.org/protocol/httpbind' sid='"+sid+"'><auth xmlns='urn:ietf:params:xml:ns:xmpp-sasl' mechanism='DIGEST-MD5'/></body>";
                         $.post("/http-bind",envio,function(data){
                                 var cifrado = $(data).find("body").find("challenge").text();
                                 var attribMatch = /([a-z]+)=("[^"]+"|[^,"]+)(?:,|$)/;
                                var challenge = new Base64().decode(cifrado);
                                var cnonce = hex_md5(Math.random() * 1234567890);
                                var realm = "";
                                var host = null;
                                var nonce = "";
                                var qop = "";
                                var matches;

                                while (challenge.match(attribMatch)) {
                                        matches = challenge.match(attribMatch);
                                        challenge = challenge.replace(matches[0], "");
                                        matches[2] = matches[2].replace(/^"(.+)"$/, "$1");
                                        switch (matches[1]) {
                                        case "realm":
                                                realm = matches[2];
                                                break;
                                        case "nonce":
                                                nonce = matches[2];
                                                break;
                                        case "qop":
                                                qop = matches[2];
                                                break;
                                        case "host":
                                                host = matches[2];
                                                break;
                                        }
                                }
                                
                                var digest_uri = "xmpp/" + this.domain;
                                if (host !== null) {
                                        digest_uri = digest_uri + "/" + host;
                                }

                                
                                /*var A1 = MD5.hash(user +
                                                                  ":" + realm + ":" + password) +
                                        ":" + nonce + ":" + cnonce;*/
//Hacked to work in wixet
                                var A1 = $.cookie("hashJabber")+":" + nonce + ":" + cnonce;
                                var A2 = 'AUTHENTICATE:xmpp/wixet.com';
                                var responseText = "";
                                responseText += 'username=' +
                                        '"'+user+'",';
                                responseText += 'realm="' + realm + '",';
                                responseText += 'nonce="' + nonce + '",';
                                responseText += 'cnonce="' + cnonce + '",';
                                responseText += 'nc="00000001",';
                                responseText += 'qop="auth",';
                                responseText += 'digest-uri="xmpp/wixet.com",';
                                responseText += 'response="' +
                                        hex_md5(hex_md5(A1) + ":" +
                                                                  nonce + ":00000001:" +
                                                                  cnonce + ":auth:" +
                                                                  hex_md5(A2))  + '",';
                                responseText += 'charset="utf-8"';
                                rid++;
                                envio ="<body rid='"+rid+"' xmlns='http://jabber.org/protocol/httpbind' sid='"+sid+"'><response xmlns='urn:ietf:params:xml:ns:xmpp-sasl'>"+new Base64().encode(responseText)+"</response></body>";
                                $.post("/http-bind",envio,function(data){
                                        if($(data).find("success").length == 0)
                                        {
                                                //console.debug("Autenticacion fallida");
                                                connected = false;
                                        }
                                        else
                                        {
                                                //console.debug("Autenticacion correcta");
                                                connected = true;
                                                try{settings.onConnect();}catch(e){}
                                                rid++;
                                                envio ="<body rid='"+rid+"' xmlns='http://jabber.org/protocol/httpbind' sid='"+sid+"' to='wixet.com' xml:lang='en' xmpp:restart='true' xmlns:xmpp='urn:xmpp:xbosh'/>";
                                                $.post("/http-bind",envio,function(data){
                                                        rid++;
                                                        //messageController(data);
                                                        envio ="<body rid='"+rid+"' xmlns='http://jabber.org/protocol/httpbind' sid='"+sid+"'><iq type='set' id='_bind_auth_2' xmlns='jabber:client'><bind xmlns='urn:ietf:params:xml:ns:xmpp-bind'><resource>Wixet</resource></bind></iq></body>";
                                                        $.post("/http-bind",envio,function(data){
                                                                rid++;
                                                                //messageController(data);
                                                                envio = "<body rid='"+rid+"' xmlns='http://jabber.org/protocol/httpbind' sid='"+sid+"'><iq type='set' id='_session_auth_2' xmlns='jabber:client'><session xmlns='urn:ietf:params:xml:ns:xmpp-session'/></iq></body>";
                                                                $.post("/http-bind",envio,function(data){
                                                                        //messageController(data);
                                                                        rid++;
                                                                        envio = "<body rid='"+rid+"' xmlns='http://jabber.org/protocol/httpbind' sid='"+sid+"'><presence from='"+user+"@"+domain+"/Wixet' xmlns='jabber:client'><show>null</show></presence><presence xmlns='jabber:client'/><iq from='"+user+"@"+domain+"' type='get' id='1' xmlns='jabber:client'><vCard xmlns='vcard-temp'/></iq></body>";
                                                                        $.post("/http-bind",envio,function(data){
                                                                                escuchar();
                                                                        });
                                                                });
                                                        });
                                                });
                                        }//Fin del else
                                });
                         });
                });
        }
        
        function escuchar()
        {
                var inicio = new Date();
                var fin;
                var rid=nextRid();
                $.post("/http-bind","<body rid='"+rid+"' xmlns='http://jabber.org/protocol/httpbind' sid='"+sid+"'></body>",
                function(data)
                {
                                var body = $(data).find("body");
                                if(body.children().length > 0)
                                {
                                        messageHandler(data);
                                        escuchar();
                                }
                });
        }
        
        function messageHandler(msg)
        {
                var body = $(msg).find("body");
                if(body.find("iq").length > 0)
                        try{settings.onIq(msg);}catch(e){}
                if(body.find("presence").length > 0)
                        try{settings.onPresence(msg);}catch(e){}
                if(body.find("message").length > 0)
                        try{settings.onMessage(msg);}catch(e){}
                
        }
})(jQuery);