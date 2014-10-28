var jsonReq = {
	post : function(url,method,params,callback){
		var pobj = {
			id : "stone",
			method : method,
			params : params
		}

		$.post(url,JSON.stringify(pobj),function(data){
			callback(data);			
		});
	}
}


function formatHash2Object(){
	var hash = location.hash,strHash = "";
	if(hash.length > 0){
		strHash = hash.substr(1);
	}
	
	var oHash = {},arrHash = strHash.split("&"),tmpHash;
	for(var i=0;i<arrHash.length;i++){
		tmpHash = arrHash[i].split("=");
		oHash[tmpHash[0]] = tmpHash[1];
	}
	
	return oHash;
}