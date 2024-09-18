import sql from 'mssql';

async function runQuery() {
  try {
    // Establish the connection
    await sql.connect(config);
    
    const users = await sql.query('SELECT * FROM ModelDanychContainer.Uzytkownicy');
    const parametry = await sql.query('SELECT * FROM ModelDanychContainer.Parametry');
    const dokumenty = await sql.query('SELECT * FROM ModelDanychContainer.Dokumenty');
    
    const userObjects = users.recordset.map(user => user.Nazwa); 
    const parametryObjects = parametry.recordset.map(param => param.Nazwa); 

    const dokumentyObjects = dokumenty.recordset.map(dokument => ({
      wystawil: dokument.Wystawil,
      odebral: dokument.Odebral,
      tytul: dokument.Tytul
    }));

    return { userObjects, parametryObjects, dokumentyObjects };

  } catch (err) {
    console.error('SQL error:', err);
  } finally {
    sql.close();
  }
}

runQuery().then(result => {
  if (result) {
    const { userObjects, parametryObjects, dokumentyObjects } = result;
    console.log('User Objects:', userObjects);
    console.log('Parametry Objects:', parametryObjects);
    console.log('Dokumenty Objects:', dokumentyObjects);
  }
});
