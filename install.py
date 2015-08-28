from tachyon.bridge import run_playbook

def colour_printer(text, colour):
    colours = {"red":"\033[91m",
              "green":"\033[92m",
              "yellow":"\033[93m",
              "blue":"\033[94m"
             }
    print colours[colour] + text + "\033[0m"





event_generator = run_playbook(
    'installation/install.yml',
    'installation/inventory/target_server',
    ['test1'],
    'psycho57',
    {}
)

for event in iter(event_generator):
    #print event['event']
    if 'res' in event:
        if 'stdout' in event['res']:
            #print event['res']['stdout']
            colour_printer(event['res']['stdout'],'green')
    
    if event['event'] == 'task_start':
        pass
        #colour_printer(event['event'],"green")

