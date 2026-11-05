#!/usr/bin/env python3
"""Run in-memory corruption fixtures; source and generated files are never written."""
import pathlib,subprocess,sys
here=pathlib.Path(__file__).resolve().parent
cases=[('headers.py',['--check','--fixture-copied-byte'],'AssertionError'),('headers.py',['--check','--fixture-missing-4b'],'AssertionError'),('headers.py',['--check','--fixture-false-path'],'AssertionError'),('verify.py',['--scoped','--fixture-stripped-payload'],'missing SPDX-License-Identifier'),('verify.py',['--scoped','--fixture-false-url'],'invalid upstream path/url')]
for script,args,expected in cases:
 result=subprocess.run([sys.executable,str(here/script),*args],capture_output=True,text=True)
 if result.returncode==0 or expected not in result.stdout+result.stderr:
  print(f'FAIL {script} {args}: {result.returncode} {result.stdout} {result.stderr}'); sys.exit(1)
 print(f'PASS {script} {args}: corruption rejected')

result=subprocess.run(['node',str(here/'verify-mdx-fixtures.mjs')],cwd=here.parents[1])
if result.returncode: sys.exit(result.returncode)
result=subprocess.run(['node',str(here/'verify-public-fixtures.mjs')],cwd=here.parents[1])
if result.returncode: sys.exit(result.returncode)
