import json
from bs4 import BeautifulSoup

caminho_arquivo_html = 'data.html'

with open(caminho_arquivo_html, 'r', encoding='utf-8') as f:
    html_content = f.read()

soup = BeautifulSoup(html_content, 'html.parser')
tbody = soup.find('tbody')

dados_json = []
personalidades_masculinas = ["Jock", "Cranky", "Smug", "Lazy"]

for id_incremental, row in enumerate(tbody.find_all('tr'), start=1):
    cols = row.find_all(['td', 'th'])
    
    if len(cols) < 7:
        continue

    name = cols[0].get_text(strip=True)
    
    img_tag = cols[1].find('img')
    url = ""
    if img_tag:
        url = img_tag.get('data-src') or img_tag.get('src', '')

    species = cols[3].get_text(strip=True)
    birthday = cols[4].get_text(strip=True)
    hobbie = cols[6].get_text(strip=True)

    gender = "male" if personality in personalidades_masculinas else "female"

    quantity={
        'alligator' : 20,
        'anteater' : 20,
        'bear' : 20,
        'bird' : 50,
        'bull' : 50,
        'cat' : 50,
        'chicken' : 50,
        'cow' : 50,
        'cub' : 20,
        'deer' : 50,
        'dog' : 50,
        'duck' : 50,
        'eagle' : 20,        
        'elephant' : 5,
        'frog' : 5,
        'goat' : 50,
        'gorilla' : 5,
        'hamster' : 50,
        'hippo' : 20,
        'horse' : 50,
        'kangaroo' : 50,
        'koala' : 20,
        'lion' : 20,
        'monkey' : 20,
        'mouse' : 50,
        'octopus' : 50,
        'ostrich' : 50,
        'penguin' : 20,
        'pig' : 50,
        'rabbit': 50,
        'rhino' : 5,
        'sheep' : 50,       
        'squirrel' : 50,
        'tiger' : 5,              
        'wolf' : 50,  
    }

    rarity={
        'alligator' : 'rare',
        'anteater' : 'rare',
        'bear' : 'rare',
        'bird' : 'common',
        'bull' : 'common',
        'cat' : 'common',
        'chicken' : 'common',
        'cow' : 'common',
        'cub' : 'rare',
        'deer' : 'common',
        'dog' : 'common',
        'duck' : 'common',
        'eagle' : 'rare',        
        'elephant' : 'legendary',
        'frog' : 'legendary',
        'goat' : 'common',
        'gorilla' : 'legendary',
        'hamster' : 'common',
        'hippo' : 'rare',
        'horse' : 'common',
        'kangaroo' : 'common',
        'koala' : 'rare',
        'lion' : 'rare',
        'monkey' : 'rare',
        'mouse' : 'common',
        'octopus' : 'common',
        'ostrich' : 'common',
        'penguin' : 'rare',
        'pig' : 'common',
        'rabbit': 'common',
        'rhino' : 'legendary',
        'sheep' : 'common',       
        'squirrel' : 'common',
        'tiger' : 'legendary',              
        'wolf' : 'common',  
    }


    personagem = {
        "id": id_incremental,
        "name": name,
        "url": url,
        "personality": personality,
        "species": species,
        "birthday": birthday,
        "catchphrase": catchphrase,
        "hobbie": hobbie,
        "total": quantity[species.lower()],
        "gender": gender,
        "rarity": rarity[species.lower()]
    }
    
    dados_json.append(personagem)

caminho_arquivo_json = 'animal_crossing_data.json'

with open(caminho_arquivo_json, 'w', encoding='utf-8') as f:
    json.dump(dados_json, f, ensure_ascii=False, indent=4)

print(f"Sucesso! {len(dados_json)} personagens foram extraídos e salvos em {caminho_arquivo_json}.")