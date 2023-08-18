from django.http import JsonResponse
from pytube import YouTube
from django.http import JsonResponse
from rest_framework.decorators import api_view
import ssl
import os


@api_view(['POST'])
def download_video(request):
    url = request.data.get('url')
    check = request.data.get('checkBox')
    print(url, check)
    ssl._create_default_https_context = ssl._create_unverified_context

    try:
        yt = YouTube(url)
        if check == False:
            stream = yt.streams.filter(progressive=True).last()
            default_download_directory = os.path.expanduser("~") + '/Downloads'
            stream.download(default_download_directory)
            return JsonResponse({'message': 'Video downloaded successfully.'})
        else:
            video = yt.streams.filter(only_audio=True).first()
            default_download_directory = os.path.expanduser("~") + '/Downloads'
            out_file= video.download(output_path=default_download_directory)
            base, ext = os.path.splitext(out_file)
            new_file = base + '.mp3'
            os.rename(out_file, new_file)
            return JsonResponse({'message': 'Song downloaded successfully.'})
        
    except Exception as e:
        print(e)
        return JsonResponse({'error': str(e)}, status=400)
