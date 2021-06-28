#!/usr/bin/env python3

import argparse
import os
import pathlib
import subprocess

project_path = pathlib.Path(__file__).parent.absolute()
parser = argparse.ArgumentParser(
    description="Interface script to execute various commands for the PIO project."
)

parser.add_argument(
    "-m",
    "--monitor",
    nargs="?",
    type=int,
    const=115200,
    help="Serial monitor with a default baud rate of 115200",
)

parser.add_argument(
    "-b",
    "--build",
    action="store_true",
    help="Build project for all environments specified in platformio.ini",
)

parser.add_argument(
    "-bn",
    "--build_nucleo",
    action="store_true",
    help="Build firmware for NUCLEO-F411RE",
)
parser.add_argument(
    "-un",
    "--upload_nucleo",
    action="store_true",
    help="Build and upload firmware to NUCLEO-F411RE",
)

parser.add_argument(
    "-bf",
    "--build_feather",
    action="store_true",
    help="Build firmware for Feather F405",
)
parser.add_argument(
    "-uf",
    "--upload_feather",
    action="store_true",
    help="Build and upload firmware to Feather F405",
)

parser.add_argument(
    "-bh",
    "--build_haloship",
    action="store_true",
    help="Build firmware for Haloship F405",
)
parser.add_argument(
    "-uh",
    "--upload_haloship",
    action="store_true",
    help="Build and upload firmware to Haloship F405",
)


args = parser.parse_args()
if args.monitor:
    print("Starting serial monitor at {baud}...".format(baud=args.monitor))
    os.system("pio device monitor --baud {baud}".format(baud=args.monitor))

elif args.build:
    print("Building for all specified environments...")
    os.system("pio run")

elif args.build_nucleo:
    print("Building for Nucleo-F411RE...")
    os.system("pio run -e nucleo")

elif args.build_feather:
    print("Building for Feather F405...")
    os.system("pio run -e feather")

elif args.build_haloship:
    print("Building for Haloship F405...")
    os.system("pio run -e haloship")

elif args.upload_nucleo:
    print("Building and uploading to Nucleo-F411RE...")
    os.system("pio run -e nucleo -t upload")

elif args.upload_feather:
    print("Building and uploading to Feather F405...")
    os.system("pio run -e feather -t upload")

elif args.upload_haloship:
    print("Building and uploading to Haloship F405...")
    os.system("pio run -e haloship -t upload")
