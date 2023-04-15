function cryptoprice_format_price(value) {     
var parts = value.split(".");     
return '<span class="cryptopricer">$</span>'         + parts[0]          + '<span class="cryptopricer">.'          + parts[1]         + '</span>'; }

function cryptoprice_start_socket(e, token, curr)
{
    var url = "wss://limitlex.com/websocket/?" + "c1=" + token + "&c2=" + curr;
    var socket = new WebSocket(url);
    socket.onmessage = function(x)
    {
        let msg = JSON.parse(x.data);
        if(msg.t == "best_bid_ask")
        {
            if(token == msg.currencyId1 && msg.ask)
                e.html(cryptoprice_format_price(msg.ask));
        }
    };
}

function cryptoprice_init(e)
{
    if(!e.length) return;
    var curr_ids = jQuery('#cryptopricepair').val().split(':');
    e.html(cryptoprice_format_price(e.text()));
    cryptoprice_start_socket(e, curr_ids[0], curr_ids[1]);
}

jQuery(document).ready(function(){
    cryptoprice_init(jQuery("#cryptoprice"));
});