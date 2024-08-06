from bs4 import BeautifulSoup
import requests
import json
from urllib.parse import urljoin
from urls import urls_1, urls_2, headers, base_url, box_href

def get_box_score_urls(url):
    #scripting on the years are the same here
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'lxml')
    urls = []
    for a_tag in soup.find_all('a', href=True):
        href = a_tag['href']
        if box_href in href:
            full_url = urljoin(base_url, href)
            if full_url not in urls:
                urls.append(full_url)

    return urls


if __name__ == "__main__":

    all_urls = urls_1 + urls_2
    all_urls = sorted(all_urls)

    for url in all_urls:
        urls = get_box_score_urls(url)
        year = url.split("/")[-1].split("_")[0]
        with open(f'box_score_urls_{year}.json', 'w') as f:
            json.dump(urls, f)