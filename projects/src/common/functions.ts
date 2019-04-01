export function queryParam( ary ) {
    return Object.keys( ary ).map( function( key ) {
        if ( Array.isArray( ary[key] ) ) {
            let arrayParts = [];

            for (let i = 0; i < ary[key].length; i++ ) {
                arrayParts.push( encodeURIComponent( key + '[]' ) + '=' + encodeURIComponent( ary[key][i] ) );
            }
            
            return arrayParts.join( '&' );
        }
        return encodeURIComponent( key ) + '=' + encodeURIComponent( ary[key] );
    }).join('&');
};
