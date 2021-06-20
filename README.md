# Ground Control 

Repository to host ground-software to receive incoming flight data and Dashboard code to visualize incoming data. 

## Installation

Use the following code to clone the repository to your local machine.

```bash
git clone https://github.com/haloship/ground-control.git

```

## ground-software setup

Install VScode and install the PlatformIO IDE. The installation guide can be found [here](https://docs.platformio.org/en/latest/integration/ide/vscode.html#ide-vscode). 

Execute the following commands in the Ground Control Repository for the ground-software setup

```bash
#Enter into ground-software directory 
cd ground-software 

#Install appropriate python libraries
sudo apt install python-pip
pip install argparse pathlib

# Manage usser groups for usb/dfu permissions
sudo usermod -a -G dialout <username>
sudo usermod -a -G plugdev <username>

```


## Dashboard setup

Execute the following commands in the Ground Control Repository for the Dashboard setup

```bash
#Enter into Dashboard directory 
cd Dashboard

#install appropriate node related libraries
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
nvm install stable --latest-npm
nvm alias default stable

#Make sure the node version is above 10.0.0
node --version

#install dependencies
npm install 

```


## Usage

### Start the ground microcontroller.
Run the following commands in the PlatformIO terminal in VScode. The microcontroller must be connected to the machine. 

```bash 
cd ground-software 
python interface.py -uf
```

### Start the Dashboard

```bash 
cd Dashboard
node index.js
```
open localhost:4000 using a browser to view the Dashboard. 
