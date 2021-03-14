import nacl from 'tweetnacl'
import { ApplicationCommandInteractionDataOption } from './models'


const types = [
  'offset',
  'Sub command',
  'Sub command group',
  'String',
  'Number',
  'Boolean',
  'User',
  'Channel',
  'Role'
]


export async function handleRequest(request: Request): Promise<Response> {
  let raw = await request.text()
  console.log(raw)

  let payload: Payload = JSON.parse(raw)
  const signature = request.headers.get('X-Signature-Ed25519')
  const timestamp = request.headers.get('X-Signature-Timestamp')

  const isVerified = nacl.sign.detached.verify(
    Buffer.from(timestamp + raw),
    Buffer.from(signature, 'hex'),
    Buffer.from(PUBLIC_KEY, 'hex'),
  )

  if (!isVerified)
    return new Response('invalid request signature', { status: 401 })
  }
  switch (payload.type) {
    case 1:
      return new Response(JSON.stringify({ type: 1 }))
    case 2:
      if (payload.data !== undefined) {
        let commandName = payload.data.name

        let fields = "";
        let options = payload.data.options
        while (options && options.length === 1 && (options[0].type === 1 || options[0].type === 2)) {
          commandName += " " + options[0].name
          options = options[0].options;
        }

        let embed = {
          title: commandName,
          description: ""
        }

        if (options && options.length > 0) {
          let out = ""
          options.forEach(
            (option: ApplicationCommandInteractionDataOption) => {
              out += `- ${option.name}: ${option.value} (type ${types[option.type]})\n`
            }
          );
          embed.description = out;
        } else {
          embed.description = "No arguments provided"
        }

        return new Response(JSON.stringify({
          type: 4,
          data: {
            embeds: [embed],
          },
        }))

      }
  }
}
