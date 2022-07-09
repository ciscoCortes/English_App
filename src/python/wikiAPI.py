import re
from wiktionaryparser import WiktionaryParser
parser = WiktionaryParser()


def fetch_wiki_word(word):
    result = {}
    try:
        response = parser.fetch(word)
        for meaning in response:
            # filtering pronunciations.
            IPAs = {}
            for p in meaning['pronunciations']['text']:
                if 'IPA:' in p:
                    UK = re.search('England|UK|Received Pronunciation', p)
                    US = re.search('US|American|GenAm|enPR', p)
                    if US and 'US' not in IPAs:
                        IPAs['US'] = re.search('(IPA: )(.*)', p).group(2)
                    if UK and 'UK' not in IPAs:
                        IPAs['UK'] = re.search('(IPA: )(.*)', p).group(2)
                    if re.match('IPA:', p) and 'IPA' not in IPAs:
                        IPAs['IPA'] = re.search('(IPA: )(.*)', p).group(2)
            if len(IPAs) == 3:
                del IPAs['IPA']
            if len(IPAs) == 2:
                if 'UK' in IPAs and 'US' in IPAs:
                    if IPAs['UK'] == IPAs['US']:
                        IPAs['IPA'] = IPAs['US']
                        del IPAs['UK'], IPAs['US']

            for definition in meaning['definitions']:
                word_class = definition['partOfSpeech']
                def_list = []
                count = 0
                for df in definition['text']:
                    count += 1
                    if count == 1:
                        morfology = df
                        continue
                    match = re.search(
                        "(?:\(.*)(UK|slang|obsolete|dialectal|Caribbean|MLE)(?:.*\))", df)
                    if match:
                        continue
                    match = re.match("Dated form", df)
                    if match:
                        continue
                    def_list.append(df)
                if len(def_list) == 0:
                    continue
                if len(definition["examples"]) == 0:
                    continue

                examples = []
                for Eg in definition['examples']:
                    if len(Eg) < 150 and not re.match('Audio', Eg) and not re.match("Synonym", Eg):
                        examples.append(Eg)
                if len(examples) == 0:
                    continue
                examples.sort(key=lambda x: len(x))
                if len(examples) > 10:
                    examples = examples[:10]

                data = {}
                data['class'] = word_class
                data['examples'] = examples

                if word in Dict:
                    Dict['meanings'].append(data)
                else:
                    Dict["morfology"] = morfology
                    Dict['pronunciation'] = IPAs
                    Dict['meanings'] = []
                    Dict['meanings'].append(data)
    except:
        return False

    return result


def wikiAPI(words=[]):
    new_dict = {}
    for word in words:
        result = fetch_wiki_word(word)
        if result:
            new_dict[word] = result
    return new_dict
