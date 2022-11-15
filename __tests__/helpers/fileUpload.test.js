import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
    cloud_name: 'dmuswnvaf',
    api_key: '485988593188787',
    api_secret: '9mk0sDkGNfIu_aXKhFxvntL3T0w',
    secure: true,
})

describe('tests on fileUpload', () => { 
    
    test('should upload the image to cloudinaryyy', async() => { 
        
        const imageUrl = 'https://ichef.bbci.co.uk/news/640/cpsprodpb/15665/production/_107435678_perro1.jpg'
        const resp = await fetch( imageUrl );
        const blob = await resp.blob();
        const file = new File( [blob], 'photo.jpg' );

        const url = await fileUpload( file );

        
        expect( typeof url ).toBe('string');
       
        /* Semento para eliminar la imagen subida */
        const segment = url.split( '/' );
        const imageId = segment[ segment.length - 1 ].replace( '.jpg', '' );
        const cloudResp = await cloudinary.api.delete_resources( [ `journal/${ imageId }` ], { resource_type: 'image' } );
        
     })

     test('should return error message', async() => { 
        
        const file = new File( [], 'photo.jpg' );

        const url = await fileUpload( file );

        expect( url ).toBe( undefined );

     })

 })