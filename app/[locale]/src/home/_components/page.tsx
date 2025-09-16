import Image from "next/image";
import {getTranslations} from 'next-intl/server';
import LanguageSwitcher from './LanguageSwitcher';

interface Photo{
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

export default async function ServerGridPage(){
    const t = await getTranslations('HomePage');

    const response = await fetch('https://jsonplaceholder.typicode.com/photos');
    const photos:Photo[] = await response.json();
    const imagePhotos: Photo[] = photos.map(photo => ({
        ...photo,
        url: 'https://fastly.picsum.photos/id/866/200/300.jpg'
    }));

    console.log(imagePhotos);
    return(
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">{t('title')}</h1>
                    <p className="text-gray-600">{t('subtitle')}</p>
                </div>
                <LanguageSwitcher />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {imagePhotos.map((photo: Photo) => (
                    <div id="photo" className="border border-white p-4 rounded-lg shadow-md" key={photo.id}>
                        <h2 className="text-lg font-semibold mb-2">{photo.title}</h2>
                        <Image 
                        alt={t('imageAlt')}
                        src={photo.url} 
                        width={450} 
                        height={450}
                        className="rounded-lg"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
