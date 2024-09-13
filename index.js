const { Client, GatewayIntentBits  } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

var help_txt = `## Database Management and Service bot for International Rapid Response Group (NOT ADMINISTRATION)\n\n𝙳𝙰𝚃𝙴                       ///         𝟶𝟿/𝟷𝟸/𝟸𝟶𝟸𝟺\n𝚂𝚃𝙰𝚃𝚄𝚂                 ///          𝙾𝙽𝙻𝙸𝙽𝙴\n𝙳𝙴𝙿𝙻𝙾𝚈𝙼𝙴𝙽𝚃      ///          𝚃𝙴𝚂𝚃𝙸𝙽𝙶\n\nFurther Information: https://irrgroup.web.app/\n\n**Commands:**\n///help - Shows this message\n///website - Forwards a link for the IRRG website\n///bunker - Showcases Bunker Procedure\n///server, ///server_id, ///server_code, ///code - Outputs the latest server code\n///op - Shows details about the latest active operation`;

var website_txt = `## https://irrgroup.web.app/\nOfficial Website of International Rapid Response Group`;

var bunker_txt = `\`\`\`diff
- INTERNATIONAL RAPID RESPONSE GROUP /// BUNKER PROCEDURE
\`\`\`
\`\`\`*A10 will land right outside the entrance and bombard the bunker before the main unit goes in.

* The operators along with the armored vehicles will then proceed to sweep all stages, until the 3rd gate. **Avoid taking the shortcut (the door that opens, leading to the enemy's flank).**

* The first power-box and the second power-box will be sabotage, leaving the third one. The operators shall then resupply first and take positions outside the gate. **Once the operators are ready, the third power-box shall be sabotage.**

* Once the door is open, all operators will work their way to the elevator. **However, all operators are required to resupply first before stepping inside the elevator.**

* Before heading to the ladder, or the door, **operators will hold their ground at least 5m away from the door.** Let the NPCs rush from the door, then eliminate them. Once clear, operators may then proceed to ladder or the door, **depending on the amount of people.**
\`\`\``;

client.once('ready', () => {
    console.log(`${client.user.tag}! /// STATUS /// ONLINE\nINITIALIZING`);
});

client.on('messageCreate', message => {
    if (message.content === '///help') {
        message.channel.send(help_txt);
    }
});

client.on('messageCreate', message => {
    if (message.content === '///website') {
        message.channel.send(website_txt);
    }
});

client.on('messageCreate', message => {
    if (message.content === '///bunker') {
        message.channel.send(bunker_txt);
    }
});

const channelId = '1276908133540823092';
const messageId = '1277221413681631323';

client.on('messageCreate', async message => {
    const commands = ['///server', '///server_id', '///server_code', '///code']; 
    if (commands.includes(message.content)) {

        try {
            const channel = client.channels.cache.get(channelId);
            if (!channel) {
                return message.channel.send('Invalid channel ID.');
            }

            const fetchedMessage = await channel.messages.fetch(messageId);
            message.channel.send(`## ${fetchedMessage.content}`);
        } catch (error) {
            console.error('Error fetching message:', error);
            message.channel.send('Could not fetch data. Original message for Private Server ID does not exist. Contact \_scepter88_ immediately.');
        }
    }
});

// client.on('messageCreate', async message => {
//     const op_check = ['any bunker going on?', 'Any bunker going on?', 'any bunker going on', 'Any bunker going on', '///op', 'any bunker?', 'any bunker', 'Any bunker?', 'Any bunker', 'Bunker?', 'Bunker', 'bunker?', 'bunker', 'any bunker going on right now?', 'any bunker going on right now', 'Any bunker going on right now?', 'Any bunker going on right now',]; 
//     if (op_check.includes(message.content)) {
//         try {
//             const channel = await client.channels.fetch('1264242564291104829');
//             const messages = await channel.messages.fetch({ limit: 10 });
//             const keywords = ['bunker', 'intel', 'ready', 'procedure', 'pb', 'recruit', 'help'];
//             const ignoreText = "- INTERNATIONAL RAPID RESPONSE GROUP /// BUNKER PROCEDURE";
//             const bunkerMessages = messages.filter(msg => 
//                 keywords.some(keyword => msg.content.toLowerCase().includes(keyword)) &&
//                 !msg.content.includes(ignoreText)
//             );

//             if (bunkerMessages.size > 0) {
//                 const lastMessage = bunkerMessages.first();
//                 const timeAgo = Date.now() - lastMessage.createdTimestamp;
//                 const timeAgoMinutes = Math.floor(timeAgo / 60000);
//                 const timeAgoHours = Math.floor(timeAgoMinutes / 60);
//                 const timeAgoDays = Math.floor(timeAgoHours / 24);

//                 let timeAgoString = '';
//                 if (timeAgoDays > 0) {
//                     timeAgoString = `${timeAgoDays} day(s) ago`;
//                 } else if (timeAgoHours > 0) {
//                     timeAgoString = `${timeAgoHours} hour(s) ago`;
//                 } else {
//                     timeAgoString = `${timeAgoMinutes} minute(s) ago`;
//                 }

//                 let lastMessageContent = lastMessage ? lastMessage.content.replace(/@everyone/g, '\`@everyone\`') : '';

//                 const otherChannel = await client.channels.fetch('1276908133540823092');
//                 const fetchedMessageB = await otherChannel.messages.fetch('1277221413681631323');
//                 let serverCode = fetchedMessageB.content.match(/PRIVATE SERVER CODE: .{2}(\S+)/)[1];
//                 let formattedServerCode = `\`\`\`${serverCode}\`\`\``;

//                 if (timeAgoMinutes < 60) {
//                     message.channel.send(`## **Join the operation**\n\nLast message from #planned-operations reads:\n\`\`\`${lastMessageContent}\`\`\`\nSent: **${timeAgoString}**\n\nServer Code: ${formattedServerCode}`);
//                 } else {
//                     message.channel.send(`No active operations going on\n\nLast message from #planned-operations was more than an **1 hour ago**:\n "${lastMessageContent}"\n\nSent: **${timeAgoString}**\n\n*Please stand-by...*`);
//                 }
//             } else {
//                 message.channel.send('No recent operations found.');
//             }
//         } catch (error) {
//             console.error('Error fetching messages:', error);
//             message.channel.send('There was an error fetching messages from the channel.');
//         }
//     }
// });

const { EmbedBuilder } = require('discord.js');

client.on('messageCreate', async message => {
    const op_check = ['any bunker going on?', 'Any bunker going on?', 'any bunker going on', 'Any bunker going on', '///op', 'any bunker?', 'any bunker', 'Any bunker?', 'Any bunker', 'Bunker?', 'Bunker', 'bunker?', 'bunker', 'any bunker going on right now?', 'any bunker going on right now', 'Any bunker going on right now?', 'Any bunker going on right now', 'anybody playing?', 'anybody playing', 'Anybody playing?', 'Anybody playing', 'anybody playin?', 'anybody playin', 'Anybody playin']; 
    if (op_check.includes(message.content)) {
        try {
            const channel = await client.channels.fetch('1264242564291104829');
            const messages = await channel.messages.fetch({ limit: 10 });
            const keywords = ['bunker', 'intel', 'ready', 'procedure', 'pb', 'recruit', 'help'];
            const ignoreText = "- INTERNATIONAL RAPID RESPONSE GROUP /// BUNKER PROCEDURE";
            const bunkerMessages = messages.filter(msg => 
                keywords.some(keyword => msg.content.toLowerCase().includes(keyword)) &&
                !msg.content.includes(ignoreText)
            );

            if (bunkerMessages.size > 0) {
                const lastMessage = bunkerMessages.first();
                const timeAgo = Date.now() - lastMessage.createdTimestamp;
                const timeAgoMinutes = Math.floor(timeAgo / 60000);
                const timeAgoHours = Math.floor(timeAgoMinutes / 60);
                const timeAgoDays = Math.floor(timeAgoHours / 24);

                let timeAgoString = '';
                if (timeAgoDays > 0) {
                    timeAgoString = `${timeAgoDays} day(s) ago`;
                } else if (timeAgoHours > 0) {
                    timeAgoString = `${timeAgoHours} hour(s) ago`;
                } else {
                    timeAgoString = `${timeAgoMinutes} minute(s) ago`;
                }

                let lastMessageContent = lastMessage ? lastMessage.content.replace(/@everyone/g, '\`@everyone\`') : '';

                const otherChannel = await client.channels.fetch('1276908133540823092');
                const fetchedMessageB = await otherChannel.messages.fetch('1277221413681631323');
                let serverCode = fetchedMessageB.content.match(/PRIVATE SERVER CODE: .{2}(\S+)/)[1];
                let formattedServerCode = `\`\`\`${serverCode}\`\`\``;

                const embed = new EmbedBuilder()
                    .setTitle('Active Operations')
                    .setDescription(`Last message from #planned-operations reads:\n\n\`\`\`${lastMessageContent}\`\`\``)
                    .addFields(
                        { name: 'Sent', value: `\n${timeAgoString}\n`, inline: true },
                        { name: 'Private Server Code', value: `\n${formattedServerCode}\n`, inline: true }
                    )
                    .setColor('#FF0000');

                if (timeAgoMinutes < 60) {
                    message.channel.send({ embeds: [embed] });
                } else {
                    embed.setTitle('No active operations');
                    embed.setDescription(`\n\nLast message from #planned-operations was more than an **1 hour ago**:\n\n \`\`\`${lastMessageContent}\`\`\`\n\n*Please stand-by...*`);
                    embed.setColor('#000000');
                    message.channel.send({ embeds: [embed] });
                }
            } else {
                message.channel.send('No recent operations found.');
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
            message.channel.send('There was an error fetching messages from the channel.');
        }
    }
});

// AI


client.login('MTI4MzY5MzQ5NzQ1ODYyNjU3MA.GyIrxa.KT_UXPr7Rniv314NennUK3dS012Q8MeHOqj_LU');


