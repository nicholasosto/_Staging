local TestEZ = require(game.ReplicatedStorage.Packages.TestEZ)

-- run every *.spec module under ReplicatedStorage.Packages
return TestEZ.TestBootstrap:run(
    { game.ReplicatedStorage.Packages },
    TestEZ.Reporters.TextReporterQuiet
)