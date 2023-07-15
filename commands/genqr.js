const {SlashCommandBuilder}=require('discord.js');
const QRCode=require('qrcode');
const fs=require('node:fs');

const data=new SlashCommandBuilder().setName('genqr').setDescription('Generates a QR code from given text.')
.addStringOption(option=>option.setName('text').setDescription('Provide text to convert to QR.').setRequired(true));



async function execute(interaction){
    await interaction.deferReply();
    await QRCode.toFile('output/out.png',interaction.options.getString('text')).catch(err=>console.log(err));
    const imageFile = fs.readFileSync(`output/out.png`);
    await interaction.editReply({files:[{attachment: imageFile}]});
};

module.exports={data,execute};