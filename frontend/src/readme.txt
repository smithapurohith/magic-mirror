###Backend and frontend need to be run separately but simultanepusly on two different terminals without closing the first run terminal###

Backend:
C:\Users\.........\magic-mirror\backend> .\venv\Scripts\activte
>>
>>
(venv) PS C:\Users\\magic-mirror\backend> python main.py
>>
* Serving Flask app 'main'
 * Debug mode: on
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 519-547-583
 * Detected change in 'C:\\Users\\smith\\.gemini\\antigravity\\scratch\\magic-mirror\\backend\\main.py', reloading
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 519-547-583

#Leave the backend terminal without closing when a similar output to this is achieved.
#Next open a new terminal for frontend without closing the backend terminal


Frontend:
C:\Users\.........\magic-mirror> cd frontend
C:\Users\.........\magic-mirror\frontend> npm run dev
> magic_mirror@0.0.0 dev
> vite


  VITE v7.3.1  ready in 218 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
5:27:10 pm [vite] (client) hmr update /src/App.jsx
5:27:10 pm [vite] (client) hmr update /src/App.jsx (x2)
5:27:41 pm [vite] (client) hmr update /src/App.jsx (x3)
5:27:44 pm [vite] (client) hmr update /src/components/ControlPanel.jsx

*****When the local server is runnning open the https://..... link (line: 35) in the brower*****