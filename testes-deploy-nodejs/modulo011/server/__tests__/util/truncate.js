import database from '../../src/database';

function truncate() {
  const models = database.connection;

  return Promise.all(
    Object.keys(models).map((key) => {
      return models[key].destroy({
        truncate: true,
        force: true,
      });
    })
  );
}

export default truncate;
